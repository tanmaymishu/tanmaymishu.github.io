import Link from "next/link";
export default function ArticleList() {
  return (
    <div className="pt-16 pb-20 lg:pt-20 lg:pb-28">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            Latest Articles
          </h2>
        </div>
        <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
          <div>
            <p className="text-sm text-gray-500">
              <time dateTime="2022-04-26">Apr 26, 2022</time>
            </p>
            <Link href="/articles/2022-04/uses">
              <a className="mt-2 block">
                <p className="text-xl font-semibold text-gray-900">
                  What I use
                </p>
                <p className="mt-3 text-base text-gray-500">
                  In this post I'll share what are some of the tools I use on a
                  daily basis. This article is inspired by Wes Bos' /uses.
                </p>
              </a>
            </Link>
            <div className="mt-3">
              <Link href="/articles/2022-04/uses">
                <a className="text-base font-semibold text-blue-600 hover:text-blue-500">
                  Read full story
                </a>
              </Link>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              <time dateTime="2020-07-23">Jul 23, 2022</time>
            </p>
            <Link href="/articles/2022-07/configure-vite-in-a-laravel-project">
              <a className="mt-2 block">
                <p className="text-xl font-semibold text-gray-900">
                  Configure Vite in a Laravel Project
                </p>
                <p className="mt-3 text-base text-gray-500">
                  Laravel has recently switched from Laravel Mix to Vite. All
                  the projects in the ecosystem will be using Vite from now
                  on...
                </p>
              </a>
            </Link>
            <div className="mt-3">
              <Link href="/articles/2022-07/configure-vite-in-a-laravel-project">
                <a className="text-base font-semibold text-blue-600 hover:text-blue-500">
                  Read full story
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
