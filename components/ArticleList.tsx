import Link from "next/link";

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const posts = [
  {
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
  },
  {
    title: "How to use search engine optimization to drive sales",
    href: "#",
    description:
      "Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
  },
  {
    title: "Improve your customer experience",
    href: "#",
    description:
      "Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis.",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
  },
  {
    title: "Writing effective landing page copy",
    href: "#",
    description:
      "Ipsum voluptates quia doloremque culpa qui eius. Id qui id officia molestias quaerat deleniti. Qui facere numquam autem libero quae cupiditate asperiores vitae cupiditate. Cumque id deleniti explicabo.",
    date: "Jan 29, 2020",
    datetime: "2020-01-29",
  },
];

export default function ArticleList() {
  return (
    <div className="pt-16 pb-20 lg:pt-20 lg:pb-28">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            Latest Articles
          </h2>
          {/* <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
            <p className="text-xl text-gray-500">
              Get weekly articles in your inbox on how to grow your business.
            </p>
            <form className="mt-6 flex flex-col sm:flex-row lg:mt-0 lg:justify-end">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none w-full px-4 py-2 border border-gray-300 text-base rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 lg:max-w-xs"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex">
                <button
                  type="button"
                  className="w-full bg-blue-600 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:inline-flex"
                >
                  Notify me
                </button>
              </div>
            </form>
          </div> */}
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
              <time dateTime="2020-03-16">Mar 16, 2020</time>
            </p>
            <a href="#" className="mt-2 block">
              <p className="text-xl font-semibold text-gray-900">
                Boost your conversion rate
              </p>
              <p className="mt-3 text-base text-gray-500">
                Illo sint voluptas. Error voluptates culpa eligendi. Hic vel
                totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed
                exercitationem placeat consectetur nulla deserunt vel. Iusto
                corrupti dicta.
              </p>
            </a>
            <div className="mt-3">
              <a
                href="/telepresence"
                className="text-base font-semibold text-blue-600 hover:text-blue-500"
              >
                Read full story
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              <time dateTime="2020-03-16">Mar 16, 2020</time>
            </p>
            <a href="#" className="mt-2 block">
              <p className="text-xl font-semibold text-gray-900">
                Boost your conversion rate
              </p>
              <p className="mt-3 text-base text-gray-500">
                Illo sint voluptas. Error voluptates culpa eligendi. Hic vel
                totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed
                exercitationem placeat consectetur nulla deserunt vel. Iusto
                corrupti dicta.
              </p>
            </a>
            <div className="mt-3">
              <a
                href="/telepresence"
                className="text-base font-semibold text-blue-600 hover:text-blue-500"
              >
                Read full story
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              <time dateTime="2020-03-16">Mar 16, 2020</time>
            </p>
            <a href="#" className="mt-2 block">
              <p className="text-xl font-semibold text-gray-900">
                Boost your conversion rate
              </p>
              <p className="mt-3 text-base text-gray-500">
                Illo sint voluptas. Error voluptates culpa eligendi. Hic vel
                totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed
                exercitationem placeat consectetur nulla deserunt vel. Iusto
                corrupti dicta.
              </p>
            </a>
            <div className="mt-3">
              <a
                href="/telepresence"
                className="text-base font-semibold text-blue-600 hover:text-blue-500"
              >
                Read full story
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
