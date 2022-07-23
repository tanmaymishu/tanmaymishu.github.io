import Link from "next/link";

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

export default function AllArticles() {
  return (
    <div className="pt-8 pb-20">
      {/* <div className="relative max-w-lg mx-auto divide-y-2 space-y-5 divide-gray-200 lg:max-w-7xl">
        <section>
          <Link href="/articles/2022-04/uses">
            <a className="text-xl font-bold text-blue-500 hover:underline">
              What I Use
            </a>
          </Link>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio,
            cumque.
          </p>
        </section>
        <section>
          <Link href="/articles/2022-07/configure-vite-in-a-laravel-project">
            <a className="text-xl font-bold text-blue-500 hover:underline">
              Configure Vite in a Laravel Project
            </a>
          </Link>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio,
            cumque.
          </p>
        </section>
      </div> */}
      <section className="container mx-auto px-4 lg:px-40 xl:px-48 text-gray-700 max-w-lg divide-y-2 space-y-5 divide-gray-200 lg:max-w-7xl">
        <section>
          <Link href="/articles/2022-04/uses">
            <a className="text-xl font-bold text-blue-500 hover:underline">
              What I Use
            </a>
          </Link>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio,
            cumque.
          </p>
        </section>
        <section>
          <Link href="/articles/2022-07/configure-vite-in-a-laravel-project">
            <a className="text-xl font-bold text-blue-500 hover:underline">
              Configure Vite in a Laravel Project
            </a>
          </Link>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio,
            cumque.
          </p>
        </section>
      </section>
    </div>
  );
}
