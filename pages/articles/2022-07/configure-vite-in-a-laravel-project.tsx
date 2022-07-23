import Head from "next/head";
import Link from "next/link";
import React, { FunctionComponent } from "react";
import Navbar from "../../../components/Navbar";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface ConfigureViteLaravelProps {}

const ConfigureViteLaravel: FunctionComponent<ConfigureViteLaravelProps> = (
  props
) => {
  return (
    <>
      <Head>
        <title>
          How to configure Vite with Inertia, React, TypeScript in a Laravel
          Project
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="In this article, I will show how to configure Vite with Inertia, React, TypeScript in a Laravel Project."
        />

        <meta
          property="og:title"
          content="How to configure Vite with Inertia, React, TypeScript in a Laravel Project"
          key="title"
        />
        <meta
          property="og:description"
          content="In this article, I will show how to configure Vite with Inertia, React, TypeScript in a Laravel Project."
        />
        <meta
          property="og:url"
          content="https://tanmaydas.com/articles/2022-07/configure-vite-in-a-laravel-project"
        />
        <meta property="og:type" content="website" />
      </Head>
      <Navbar />
      <section className="container mx-auto px-4 lg:px-40 xl:px-48 text-gray-700">
        <p className="text-blue-500 hover:underline mt-4">
          <Link href={"/articles"}>← All Articles</Link>
        </p>
        <div className="mt-4 leading-10">
          <p className="font-bold text-3xl">
            How to configure Vite with Inertia, React, and TypeScript in a
            Laravel Project
          </p>
          <span className="text-gray-500 text-xs italic">Jul 23, 2022</span>
          <p className="mt-2">
            Laravel has recently switched from Laravel Mix to Vite. All the
            projects in the ecosystem will be using Vite from now on. In this
            article I will discuss how to configure Vite with Inertia, React,
            TypeScript in a Laravel Project.
          </p>
          <p>
            Create a new Laravel project.
            <SyntaxHighlighter language="shell" style={github}>
              {"composer create-project laravel/laravel my-project"}
            </SyntaxHighlighter>
            Now cd into <em>my-project</em> and add the react and inertia
            dependencies:
            <SyntaxHighlighter language="shell" style={github}>
              {
                "yarn add react react-dom @inertiajs/inertia @inertiajs/inertia-react"
              }
            </SyntaxHighlighter>
            Then add the typescript dependencies:
            <SyntaxHighlighter language="shell" style={github}>
              {"yarn add typescript @types/react @types/react-dom"}
            </SyntaxHighlighter>
          </p>
        </div>
      </section>
    </>
  );
};
export default ConfigureViteLaravel;
