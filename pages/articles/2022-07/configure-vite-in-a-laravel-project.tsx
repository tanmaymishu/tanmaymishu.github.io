import Head from "next/head";
import Link from "next/link";
import React, { FunctionComponent } from "react";
import Navbar from "../../../components/Navbar";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import ArticleContainer from "../../../components/ArticleContainer";
import Footer from "../../../components/Footer";
import Meta from "../../../components/Meta";
import Comment from "../../../components/Comment";

interface ConfigureViteLaravelProps {}

const ConfigureViteLaravel: FunctionComponent<ConfigureViteLaravelProps> = (
  props
) => {
  return (
    <>
      <Meta
        title="How to configure Vite with Inertia, React, and TypeScript in a
              Laravel Project"
        description="Laravel has recently switched from Laravel Mix to Vite. All the
          projects in the ecosystem will be using Vite from now on. In this
          article I will discuss how to configure Vite with Inertia, React,
          TypeScript in a Laravel Project."
        url="/articles/2022-07/configure-vite-in-a-laravel-project"
      ></Meta>
      <Navbar />
      <ArticleContainer>
        <ArticleContainer.ArticleBody>
          <ArticleContainer.ArticleHeading
            title="How to configure Vite with Inertia, React, and TypeScript in a Laravel Project"
            date="July 23, 2022"
          ></ArticleContainer.ArticleHeading>
          <div className="mt-4 leading-10">
            <p className="">
              Laravel has recently switched from Laravel Mix to Vite. All the
              projects in the ecosystem will be using Vite from now on. In this
              article I will discuss how to configure Vite with Inertia, React,
              TypeScript in a Laravel Project.
            </p>
            <section>
              Create a new Laravel project.
              <SyntaxHighlighter language="shell" style={github}>
                {
                  "composer create-project laravel/laravel laravel-vite-inertia-ts"
                }
              </SyntaxHighlighter>
              Next we have to cd into <em>laravel-vite-inertia-ts</em> directory
              and add the react and inertia dependencies:
              <SyntaxHighlighter language="shell" style={github}>
                {
                  "yarn add react react-dom @inertiajs/inertia @inertiajs/inertia-react"
                }
              </SyntaxHighlighter>
              We also have add the typescript dev dependencies:
              <SyntaxHighlighter language="shell" style={github}>
                {"yarn add -D typescript @types/react @types/react-dom"}
              </SyntaxHighlighter>
              Next, we need to generate a tsconfig.json file.
              <SyntaxHighlighter language="shell" style={github}>
                {"./node_modules/.bin/tsc --init --jsx react"}
              </SyntaxHighlighter>
              Then we need to rename the <em>/resources/js</em> directory to{" "}
              <em>/resources/ts</em> and the <em>app.js</em> file to{" "}
              <em>app.tsx</em>. Then in the <em>app.tsx</em> file we have to
              create the inertia app like the following:
              <SyntaxHighlighter language="typescript" style={github}>
                {`
    import "./bootstrap";
    import "../css/app.css";
    import React from "react";
    import { createRoot } from "react-dom/client";
    import { createInertiaApp } from "@inertiajs/inertia-react";
    import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
    
    createInertiaApp({
        resolve: (name) =>
            resolvePageComponent(
                \`./Pages/\${name}.tsx\`,
                import.meta.glob("./Pages/**/*.tsx")
            ),
        setup({ el, App, props }) {
            createRoot(el).render(<App {...props} />);
        },
    });
    `}
              </SyntaxHighlighter>
              We will notice that the <em>app.css</em> file has been imported
              here. This is the recommended way of using CSS with Inertia and
              Vite. If there is a TypeScript error saying:
              <blockquote>
                The 'import.meta' meta-property is only allowed when the
                '--module' option is 'es2020', 'es2022', 'esnext', 'system',
                'node16', or 'nodenext'.ts(1343)
              </blockquote>
              ...then we need to head over to the <code>tsconfig.json</code>{" "}
              file and change both <code>target</code> and <code>module</code>{" "}
              option to <code>esnext</code> and also uncomment the{" "}
              <code>types</code> property to enable the vite-specific typings.
              We will also need to set the <code>moduleResoultions</code>{" "}
              property to <code>node</code>
              <SyntaxHighlighter language="json" style={github}>
                {`
    // tsconfig.json
    ...
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    ...
    "types": ["vite/client"],
    ...`}
              </SyntaxHighlighter>
              Laravel ships with a vite config (<code>vite.config.js</code>)
              which is configured for JavaScript. Let's tweak that file a bit to
              fit our needs. Currently the laravel vite plugin points to the{" "}
              <code>app.js</code> file.
              <SyntaxHighlighter language="JavaScript" style={github}>
                {`
    // vite.config.js
    laravel({
      input: [
          'resources/css/app.css',
          'resources/js/app.js',
      ],
      refresh: true,
  }),
                `}
              </SyntaxHighlighter>
              We need to change it to <code>ts/app.tsx</code> file like this:
              <SyntaxHighlighter language="JavaScript" style={github}>
                {`
    // vite.config.js
    laravel(['resources/ts/app.tsx'])
                `}
              </SyntaxHighlighter>
              We will turn our attention to the server side of things now. Let's
              install inertia first:
              <SyntaxHighlighter language="shell" style={github}>
                {"composer require inertiajs/inertia-laravel"}
              </SyntaxHighlighter>
              Next, we'll add this root template <code>app.blade.php</code> to{" "}
              <code>resources/views</code> directory:
              <SyntaxHighlighter language="blade" style={github}>
                {`
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
                `}
              </SyntaxHighlighter>
              Then we will generate the Inertia middleware:
              <SyntaxHighlighter language="shell" style={github}>
                php artisan inertia:middleware
              </SyntaxHighlighter>
              And the generated middleware should be added the <em>web</em>{" "}
              middleware group in <code>Kernel.php</code>:
              <SyntaxHighlighter language="php" style={github}>
                {`
    'web' => [
        // ...
        \\App\\Http\\Middleware\\HandleInertiaRequests::class,
    ],
              `}
              </SyntaxHighlighter>
              Time to see it in action. Let's create a TSX react component,
              called <code>Welcome.tsx</code> in the{" "}
              <code>resources/ts/Pages</code> directory:
              <SyntaxHighlighter language="tsx" style={github}>
                {`
      // resources/ts/Pages/Welcome.tsx

      import React from "react";

      interface WelcomeProps {}
      
      const Welcome: React.FC<WelcomeProps> = (props) => {
          return <>Welcome from TSX</>;
      };
      export default Welcome;
                `}
              </SyntaxHighlighter>
              Now, let's head over to <code>web.php</code> and return the React
              view instead of Blade view from the <code>/</code> route:
              <SyntaxHighlighter language="php" style={github}>
                {`
  // web.php

  <?php

  use Illuminate\\Support\\Facades\\Route;
  use Inertia\\Inertia;

  Route::get('/', function () {
    return Inertia::render('Welcome');
  });
`}
              </SyntaxHighlighter>
              Now we need to make sure we are running{" "}
              <code>php artisan serve</code> and <code>yarn dev</code> in the
              terminal. If we visit the `http://localhost:8000`, we should now
              see the text: <strong>Welcome from TSX.</strong> Any changes made
              to the <code>Welcome.tsx</code> file will now be reflected via
              vite.
            </section>
          </div>
        </ArticleContainer.ArticleBody>
        <Comment />
      </ArticleContainer>
      <Footer />
    </>
  );
};
export default ConfigureViteLaravel;
