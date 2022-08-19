---
title: "How to configure Vite with Inertia, React, and TypeScript in a Laravel Project"
date: 2022-08-10T00:38:45+06:00
summary: Laravel has recently switched from Laravel Mix to Vite. All the projects in the ecosystem will be using Vite from now on. In this article I will discuss how to configure Vite with Inertia, React, TypeScript in a Laravel Project.
categories: [laravel]
tags: [setup]
---

![Vite](/vite.png)

Laravel has recently switched from Laravel Mix to Vite. All the projects in the ecosystem will be using Vite from now on. In this article I will discuss how to configure Vite with Inertia, React, TypeScript in a Laravel Project.

## Creating a new project

Let's create a new Laravel project first:

```
composer create-project laravel/laravel laravel-vite-inertia-ts
```

## Installing dependencies

Next we have to cd into laravel-vite-inertia-ts directory and add the react and inertia dependencies:

```
yarn add react react-dom @inertiajs/inertia @inertiajs/inertia-react
```

We also have to add the typescript dev dependencies:

```
yarn add -D typescript @types/react @types/react-dom
```

Next, we need to generate a tsconfig.json file.

```
./node_modules/.bin/tsc --init --jsx react
```

## Configuring client-side

Then we need to rename the /resources/js directory to /resources/ts and the app.js file to app.tsx. Then in the app.tsx file we have to create the inertia app like the following:

```ts
import "./bootstrap";
import "../css/app.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

createInertiaApp({
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob("./Pages/**/*.tsx")
    ),
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
```

We will notice that the app.css file has been imported here. This is the recommended way of using CSS with Inertia and Vite. If there is a TypeScript error saying:
The 'import.meta' meta-property is only allowed when the '--module' option is 'es2020', 'es2022', 'esnext', 'system', 'node16', or 'nodenext'.ts(1343)
...then we need to head over to the tsconfig.json file and change both target and module option to esnext and also uncomment the types property to enable the vite-specific typings. We will also need to set the moduleResoultions property to node

```json
// tsconfig.json

{
  // ...
  "target": "esnext",
  "module": "esnext",
  "moduleResolution": "node",
  // ...
  "types": ["vite/client"]
  // ...
}
```

Laravel ships with a vite config (vite.config.js) which is configured for JavaScript. Let's tweak that file a bit to fit our needs. Currently the laravel vite plugin points to the app.js file.

```js
// vite.config.js

laravel({
  input: [
      'resources/css/app.css',
      'resources/js/app.js',
  ],
  refresh: true,
}),
```

We need to change it to ts/app.tsx file like this:

```tsx
// vite.config.js

laravel(["resources/ts/app.tsx"]);
```

## Configuring server-side

We will turn our attention to the server side of things now. Let's install inertia first:
composer require inertiajs/inertia-laravel
Next, we'll add this root template app.blade.php to resources/views directory:

```php
// app/resources/views/app.blade.php

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    @vite('resources/ts/app.tsx')
    @inertiaHead
  </head>
  <body>
    @inertia
  </body>
</html>
```

Then we will generate the Inertia middleware:
php artisan inertia:middleware
And the generated middleware should be added the web middleware group in Kernel.php:

```php
// app/Http/Kernel.php

'web' => [
    // ...
    \App\Http\Middleware\HandleInertiaRequests::class,
],
```

Time to see it in action. Let's create a TSX react component, called Welcome.tsx in the resources/ts/Pages directory:

```tsx
// app/resources/ts/Pages/Welcome.tsx

import React from "react";

interface WelcomeProps {}

const Welcome: React.FC<WelcomeProps> = (props) => {
  return <>Welcome from TSX</>;
};
export default Welcome;
```

Now, let's head over to web.php and return the React view instead of Blade view from the / route:

```php
// web.php

<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return Inertia::render('Welcome');
});
```

Now we need to make sure we are running php artisan serve and yarn dev in the terminal. If we visit the `http://localhost:8000`, we should now see the text: Welcome from TSX. Any changes made to the Welcome.tsx file will now be reflected via vite.
