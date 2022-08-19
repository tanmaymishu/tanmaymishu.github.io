---
title: "The Anatomy of Laravel's tap() Function"
date: 2019-05-31T19:14:40+06:00
categories: [laravel]
tags: [metaprogramming]
---

![Tap](/tap.webp#feat)
If there is one thing I really like about the Laravel PHP Framework, it would be its level of code sophistication, whether it is in something as complex as the ORM or even in something as simple as a helper function. The latter is what this article is about.

Laravel has a Ruby-inspired, higher-order function called `tap()`. In a nutshell, the tap helper function takes a value and a callback; passes the value to the callback and returns the value. Let's take a look at how we could implement such a function from scratch in PHP:

```php
<?php
function tap($value, $callback) {
    $callback($value);
    return $value;
}
```

The function takes two arguments:

1. A value, `$value`
2. A callback function, `$callback`

As you can see, inside the function's body, the $value is passed as the argument to the callback function and after the invocation of $callback, the $value is returned from the tap() function.

Even though the function looks extremely simple, it opens the door to many possibilities. When I saw this function for the first time, I was like, why would someone even want to use that?!

We've all come across this very common 3-step situation:

- We create a new variable by calling a function that returns a value, instantiating a class or any expression that evaluates to some value. e.g. `$foo = bar();`, `$foo = new Bar;`, `$foo = 40+2;`.
- Then we do something with that variable. e.g. `$foo->calculatePrice();`
- Eventually, we return that variable. return `$foo;`

An example should make more sense:

```php
<?php
$person = new stdClass;
$person->name = 'John';
return $person;
```

The tap function allows us to simplify the example in one statement, like this:

```php
<?php
return tap(new stdClass, function($person) {
    $person->name = 'John';
});
```

Here, we pass an instance of PHP's built-in, generic `stdClass` class as our value and also the callback function which will act upon that value(instance of `stdClass`). Inside the callback, we simply assign a string 'John' to the $person's name property.

Since the tap function always returns the first argument, `$value`, we can immediately access the members of that `$value` (new `stdClass`). So in our case, if we wanted to instantiate a class, set a value to its property and then echo out the value of that property, we could do that all in a single statement:

```php
<?php
echo tap(new stdClass, function($person) {
    $person->name = 'Jane';
})->name; // Jane
```

Again, without the tap function, the above example would take the shape of this:

```php
<?php
$person = new stdClass;
$person->name = 'Jane';
echo $person->name; // Jane
```

We can also take this tapping mechanism a bit further. What if we wanted to make the callback function optional? What if all we really want is to call a method of $value and just get the $value in return, instead of what the called method actually returns?

```php
$person->setName('John'); // --> returns 'Done'.
// For some reason we want to ignore the returned value 'Done':
tap($person)->setName('John'); // --> returns $person.
// Notice the No. of arguments in tap(). No callback.
```

Here, `setName()` is a method of the $person object. We called the `setName()` method but in that process, we also disregarded `setName()`'s actual return value (The not-so-useful string "Done") and returned the $person instead. Confused? Let's take a look at a real-world scenario and then we'll update our implementation of `tap()`.

Say we have a method named `addToWallet()` in our User model:

```php
<?php
public function addToWallet($amount)
{
    if ($amount < 0) {
        return false;
    } else {
        $this->wallet()->increment('balance', $amount);
        return true;
    }
}
```

…as you can see if we call the method on `$user` object like this: `$user->addToWallet(50);` it will, of course, return a boolean. Let's say in addition to updating the user's wallet, we also need to return the `$user` from some controller's action. It would take two statements to achieve that:

```php
<?php
public function update(Request $request)
{
    // Validation logic skipped for brevity

    $user->addToWallet($request->amount);

    return $user;
}
```

But we want something like this one-liner:

```php
return tap($user)->addToWallet($request->amount); // $user
```

To achieve that we will have to enhance our current implementation of `tap()`. Let's start by making the callback optional first with the default parameter:

```php
<?php
function tap($value, $callback = null) {
    $callback($value);

    return $value;
}
```

Now comes the tricky part. We've said that when no callback is passed to the tap (`tap($user)`), we would like to return the given value (`$user`) from the called method(`->addToWallet(50)`) instead of what the called method actually returns.

How can we enforce the method (`addToWallet()`) to return the value (`$user`), when in its definition, it returns a completely different thing (true/false) than the value?

PHP has a magic method called `__call()` which, if implemented in a class, is invoked "automagically" whenever we try to call a non-existent method on an object of that class. We just have to pass the `$value` (which from now on I will also call the `$target`) to the constructor of a class that implements `__call()`. Let's call that class `TapWithoutCallback`:

```php
<?php
class TapWithoutCallback
{
    public $target;

    public function __construct($target)
    {
        $this->target = $target;
    }

    public function __call($method, $parameters)
    {
        // Calls the method on the value/target.
        // $this->user->addToWallet(50);
        $this->target->{$method}(…$parameters);

        // Returns the value/target.
        // $this->user;
        return $this->target;
    }
}
```

If we create an instance of this `TapWithoutCallback` class and try to access a method that doesn't exist there, it will delegate the method call (line 16) to the target/value that we passed during the instantiation.

As an improvement to our `tap()` function, now all we have to do is return an instance of the `TapWithoutCallback` class when no callback is passed. The finished version of our tap function looks like this:

```php
<?php
function tap($value, $callback = null) {
    if (is_null($callback)) {
        return new TapWithoutCallback($value);
    }

    $callback($value);
    return $value;
}
```

Now, if we don't pass a callback, it will return an instance of `TapWithoutCallback`(line 5) instead of returning the original `$value`:

```php
tap($user);
```

If we try to call the method `addToWallet()` on it:

```php
tap($user)->addToWallet();
```

…which doesn't exist on the instance that `tap()` has returned (`new TapWithoutCallback`), PHP will summon its `__call` magic method which will call the `addToWallet()` on behalf of the target/value (`$user`) and then return the `$user` (TapWithoutCallback.php:16-20).

Finally, we can clean up our controller's action:

```php
<?php
public function update(Request $request)
{
    return tap($user)->addToWallet($request->amount);
}
```

Interestingly, we can even chain another method of User model, since whatever method we call on the model's instance, is going to return the same instance, regardless of what the method's actual return value is. So, this is possible:

```php
<?php
tap($user)->addToWallet($request->amount)
          ->notify(new WalletUpdated);
```

But now we've lost the ability to return the `$user` from `notify()`, since `notify()` is no longer being called on the tap's returned instance. It is now being called directly on `$user`. To mitigate this problem, we can stack the tap calls like this (pay close attention to the parentheses):

```php
<?php
return tap(tap($user)->addToWallet($request->amount))
                     ->notify(new WalletUpdated);
```

`notify()` will now return the tapped value, which is the `$user`. Think of the above example as two layers of Inception.

Another use case will be Laravel's `update()` method, which also returns a boolean. We can leverage the `tap()` function to explicitly return the model, instead of the boolean:

```php
<?php
return tap($post)->update([
    'title' => $title,
    'description' => $description,
]); // $post
```

Here is the `tap()` function that Laravel implements:

```php
<?php
/**
 * Call the given Closure with the given value then return the value.
 *
 * @param  mixed  $value
 * @param  callable|null  $callback
 * @return mixed
 */
function tap($value, $callback = null)
{
    if (is_null($callback)) {
        return new HigherOrderTapProxy($value);
    }
    $callback($value);
    return $value;
}
```

Here, `HigherOrderTapProxy` is our `TapWithoutCallback`-equivalent class. Laravel's `HigherOrderTapProxy` class:

```php
<?php
namespace Illuminate\Support;
class HigherOrderTapProxy
{
    /**
     * The target being tapped.
     *
     * @var mixed
     */
    public $target;
    /**
     * Create a new tap proxy instance.
     *
     * @param  mixed  $target
     * @return void
     */
    public function __construct($target)
    {
        $this->target = $target;
    }
    /**
     * Dynamically pass method calls to the target.
     *
     * @param  string  $method
     * @param  array  $parameters
     * @return mixed
     */
    public function __call($method, $parameters)
    {
        $this->target->{$method}(...$parameters);
        return $this->target;
    }
}
```

Got any questions? Leave a comment.
