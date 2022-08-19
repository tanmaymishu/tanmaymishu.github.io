---
title: "Undocumented Laravel: Pipelines"
date: 2020-05-06T11:33:00+06:00
categories: [laravel]
tags: [metaprogramming]
---

![Pipeline](/pipeline.jpeg#feat)

Have you ever wanted to perform a series of tasks/operations on an object (or any type of data) and had to manually build up the process yourself? Did you know that you could easily handle such situations with a pattern that is built into the Laravel framework, called “Pipelines”?

If you’re familiar with the concept of middleware, you already know that when a request enters the application, the request is passed through a series of middleware, traveling from the current middleware to the next. Each middleware can be thought of as a pipe.

In order to get the basic idea about how pipelines work, we have to dig into the source code of Laravel a bit.

Let’s head over to the App\Http\Kernel class, where all middleware are registered. You’ll notice that this class doesn’t do anything other than containing the middleware. This class extends the parent Illuminate\Foundation\Http\Kernel class. Let’s examine that class.

In the handle() method of the Illuminate\Foundation\Http\Kernel, you’ll find a call to its sendRequestThroughRouter() method which returns something interesting.

It first creates an instance of the Pipeline class then passes the $request object to the send() method and conditionally passes an empty array or the middleware array to the through() method. The $request object is passed from one handle() method to another handle() method and finally, as a returned result of the dispatchToRouter() method, a function is passed to the then() method. Eventually, the result of that function call is returned and stored in the $response variable.

- The send() method accepts the data to be passed to each middleware (or pipe).
- The through() method accepts the array of middleware (or pipe) containing a handle() method.
- The then() method accepts a function to be executed when all the operations/tasks are finished.

Let’s review the syntax one more time:

```php
// An instance of Pipeline can be obtained from the container
$pipeline = app(Pipeline::class);

$result = $pipeline->send($passable) // any type of data
	->through($pipes) // array of pipes
	->then(function ($passable) { // function to be executed when finished
		return 'Some Result';
    });
```

In addition to these methods, a pipeline object has another method called via(). In general, each pipe is expected to conform to one method only, the handle() method. However, if you want to define a different method other than handle(), you should pass the name of the method of your pipe to the via() method:

```php
$result = $pipeline->send($passable) // any type of data
	->through($pipes) // array of pipes
	->via('process') // name of the method in pipe
	->then(function ($passable) { // function to be executed when finished
		return 'Some Result';
    });
```

Now let's take a look at the signature of the handle() method of a typical pipe:

```php
class DoSomething
{
    public function handle($passable, $next)
    {
        // Do some heavy-lifting work
        return $next($passable);
    }
}
```

As you can see, the handle method has two parameters: the data to pass, $passable, and a closure $next, which needs to be called in order for the $passable to travel through the pipes.

Example:
Enough with the theory, let's take a look at an example. Imagine we have a naive, fictitious order processing system where we need to perform the following tasks when an order is requested:

1. Ensure stock availability
2. Generate invoice
3. Prepare for delivery

Each of these tasks is a pipe and we need to send the order data through each of these pipes. Our goal is to confirm the order if stock is available and the invoice is generated. Let's take a look at our data class first:

```php
// Order.php
<?php
namespace App\Order;

class Order
{
    public int $id = 42;
    public bool $availableInStock = false;
    public bool $invoiceGenerated = false;
}
```

In reality, an Order class will be much more complicated than this, but for the sake of brevity, I am keeping it as minimal as possible.

We will have 3 other classes, each of which is going to represent a pipe:

```php
// EnsureStockAvailability.php

<?php
namespace App\Order;

class EnsureStockAvailability
{
    public function handle($order, $next)
    {
        if ($this->hasItemsInStock($order)) {
            $order->availableInStock = true;
            return $next($order);
        }
        return $next($order);
    }

    private function hasItemsInStock($order): bool
    {
        // Do some complex calculation with $order
        return true;
    }
}
```

```php
// GenerateInvoice.php

<?php
namespace App\Order;

class GenerateInvoice
{
    public function handle($order, $next)
    {
        if ($this->validate($order)) {
            $order->invoiceGenerated = true;
            return $next($order);
        }
        return $next($order);
    }

    private function validate($order): bool
    {
        // Do some complex calculation with $order
        return true;
    }
}
```

```php
// PrepareForDelivery.php

<?php
namespace App\Order;

class PrepareForDelivery
{
    public function handle($order, $next)
    {
        info('Preparing for delivery.');
        return $next($order);
    }
}
```

Each of these three classes is pretty self-explanatory. The handle method of EnsureStockAvailability class checks to see if the requested items are available and updates the availableInStock boolean field on $order object if items are available and then passes the $order to the next layer of  the pipeline by returning $next($order). If the items are not available, the availableInStock is not updated and holds the default value which is false. Pretty much the same for the GenerateInvoice class. It validates the order and updates the invoiceGenerated boolean field. Finally in PrepareForDelivery's handle method, only a simple text is being logged using the info() helper. Again, in a real-world application, you will probably do much more complex stuff here to actually prepare the order for delivery.

Now, we need to run the pipeline somewhere. Let's do that in a route:

```php
// web.php

<?php

use Illuminate\Support\Facades\Route;
use App\Order\EnsureStockAvailability;
use App\Order\GenerateInvoice;
use App\Order\Order;
use App\Order\PrepareForDelivery;
use Illuminate\Pipeline\Pipeline;

Route::get('/', function () {
    $pipes = [
        EnsureStockAvailability::class,
        GenerateInvoice::class,
        PrepareForDelivery::class,
    ];
    $pipeline = app(Pipeline::class);
    $result = $pipeline->send(new Order())
        ->through($pipes)
        ->then(function ($order) {
            return $order->availableInStock && $order->invoiceGenerated
                ? "Order No. $order->id is confirmed."
                : "Order No. $order->id could not be processed.";
        });
    return response()->json(['message' => $result]);
});
```

If we hit the / route now, we will see a JSON response like below:

```json
{
  "message": "Order No. 42 is confirmed."
}
```
