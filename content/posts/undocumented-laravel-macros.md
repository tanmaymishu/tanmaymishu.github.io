---
title: "Undocumented Laravel: Macros"
date: 2020-04-28T11:31:00+06:00
categories: [laravel]
tags: [metaprogramming]
---

Often in your controller actions or route closures, you may have come across situations where you want to send a JSON response with an HTTP status, especially when you're working with REST APIs:

```php
response()->json(['message' => 'Unauthorized'], 403);
```

Suddenly you realize that you’re using the same snippet across your application over and over again. Wouldn’t it be nice if you could just write something like this:

```php
response()->forbid();
```

...which actually takes care of building up that JSON response?

If you try to call the `forbid()` method on the `response()` function, obviously you’ll get an error saying that the `forbid()` method does not exist on the [ResponseFactory](https://github.com/laravel/framework/blob/master/src/Illuminate/Routing/ResponseFactory.php) class, which by the way, is the underlying implementation of [ResponseFactory](https://github.com/laravel/framework/blob/master/src/Illuminate/Contracts/Routing/ResponseFactory.php) interface. An instance of the ResponseFactory gets resolved out of the service container when we access the [Response](https://github.com/laravel/framework/blob/master/src/Illuminate/Support/Facades/Response.php) facade or the convenient `response()` helper function.

Anyway, one way to fix this problem will be to go ahead and literally add the function somewhere in the ResponseFactory class:

```php
public function forbid()
{
    return $this->json(['message' => 'Unauthorized.'], 403);
}
```

But the problem is... if memory serves me right, the vendor directory of your project is .gitignored and this ResponseFactory class lives inside the vendor directory of your project. Which means if you make this change, you will not be able to check it into the source control and your app will break on other user’s computer.

Another way of solving this will be to send a pull request to the framework’s git repository and wait for the PR to be merged. But I don’t think that’s a good idea because the maintainers of the framework will then have to fulfill every single user’s requirement. What if some other user wishes to add their custom greet() method which is unique to their project only? As a maintainer of a framework, you don’t want to bloat the framework with methods like that and create a maintenance nightmare!

Instead, we are going to leverage something that doesn't get the attention it deserves in the laravel documentation: the macros.

## What are macros?

In a nutshell, Laravel macros are the ways to extend an existing class at runtime. Let’s take a look at how we could add our custom forbid() method at runtime.

To define a macro we have to access the macro static method on a macroable class (see the list below). Response facade is macroable.

```php
Response::macro('forbid', function ($message = 'Unauthorized.') {
    return $this->json(['message' => $message], 403);
});
```

The `macro()` static method takes the name of the custom method as its first argument and the function to be executed as the second. If your macro needs to receive arguments, you could specify them in the closure, just like we did in the example to customize the response `$message`. Now, if you call this method on the facade like `Response::forbid()` or on the helper function like `response()->forbid()`, you will no longer get the error and the defined macro will be invoked. You could add as many macros as you want, on a variety of macroable classes. Let’s define another to send a 401 response when a user is unauthenticated. Let's call it `refuse()`.

```php
Response::macro('refuse', function ($message = 'Unauthenticated.') {
    return $this->json(['message' => $message], 401);
});
```

```php
// Call it in your controller or route closure:

Response::refuse();

// HTTP Response:
// HTTP/1.1 401 Unauthorized
// {"message": "Unauthenticated."}
```

So where do we register these macros? If you’ve guessed service providers, you’d be right. We could create a separate service provider or add them in the boot() method of AppServiceProvider.php:

```php
use Illuminate\Support\Facades\Response;
....
public function boot()
{
    Response::macro('refuse', ...);
    Response::macro('forbid', ...);
}
```

But the `boot()` method will quickly become cluttered as you keep adding macros. You can group your macros in a relevant class if you want and add the methods of that class instead of functions using the mixin() static method of a macroable class. The mixin() method takes an instance of the class containing the macros:

```php
<?php

namespace App\Macros;

class ResponseMacros
{
    /**
     * Refuse an unauthenticated user
     * @return \Closure
     */
    public function refuse()
    {
        return function ($message = 'Unauthenticated.') {
            return $this->json(['message' => $message], 401);
        };
    }

    /**
     * Forbid an unauthorized user
     * @return \Closure
     */
    public function forbid()
    {
        return function ($message = 'Unauthorized.') {
            return $this->json(['message' => $message], 403);
        };
    }
}
```

```php
use Illuminate\Support\Facades\Response;
use App\Macros\ResponseMacros;
....
public function boot()
{
    Response::mixin(new ResponseMacros());
}
```

Keep in mind that when using a dedicated class, your methods will be treated as macros and the methods should return the function that you want to be associated with the macro.

## How does that all work under the hood?

If you inspect the ResponseFactory class, you will see that Laravel uses a trait called Macroable. The trait has a static field `$macros` which keeps a list of macros we define in service provider and four other methods -- two of which you are already familiar with: `macro()` and `mixin()`.

Since ResponseFactory uses this trait, all these functions get mixed into that class and hence, are also available through the facade and helper since they just resolve the implementation of ResponseFactory contract behind the scenes. That's how we get access to the macro() and mixin() methods on Response facade even though they are not in the Response facade.

The hasMacro() method simply checks to see if a macro is available in the $macros array.

Both the `__call()` and `__callStatic()` PHP magic methods are called when we call a non-existent method on ResponseFactory class. This is the key thing to understand. The custom methods, `forbid()` and `refuse()` that we just defined as macros, are not direct members of the class, at least not unless they are manually bound to the class. And that's what `__call()` and `__callStatic()` methods are doing. Both methods throw a `BadMethodCallException` when the called method does not exist in the `$macros` array. If the method exists in the array, then and only then do we bind and/or call them.

Both methods check to see if the method is an instance of Closure, if it is, then the `__callStatic()` binds no context (statics don't require one) to the method, passing null to the second argument of `Closure::bind()` and on the other hand, `__call()` binds the current `$this` context to the method.

If the method is not an instance of Closure, it must be a callable and called directly using `$macro(...$parameters)`.

## What are some macroable classes of Laravel?

There are a plethora of classes that support macros. Here is a list of them:

Facades:

- Cache
- File
- Lang
- Request
- Response
- Route
- URL

Classes:

- Illuminate\Cache\Repository
- Illuminate\Console\Scheduling\Event
- Illuminate\Database\Eloquent\Builder
- Illuminate\Database\Eloquent\Relation
- Illuminate\Database\Query\Builder
- Illuminate\Filesystem\Filesystem
- Illuminate\Foundation\Testing\TestResponse
- Illuminate\Http\RedirectResponse
- Illuminate\Http\Request
- Illuminate\Http\UploadedFile
- Illuminate\Routing\ResponseFactory
- Illuminate\Routing\Router
- Illuminate\Routing\UrlGenerator
- Illuminate\Support\Arr
- Illuminate\Support\Collection
- Illuminate\Support\Str
- Illuminate\Translation\Translator
- Illuminate\Validation\Rule
