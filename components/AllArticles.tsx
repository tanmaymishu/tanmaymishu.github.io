import Link from "next/link";
import ArticleContainer from "./ArticleContainer";
import Footer from "./Footer";
import Meta from "./Meta";

export default function AllArticles() {
  return (
    <div className="">
      <Meta
        title="All Articles"
        description="Article list of Tanmay's Blog"
        url="/articles"
      />
      <ArticleContainer>
        <ArticleContainer.ArticleBody>
          <section>
            <Link href="/articles/2022-04/uses">
              <a className="text-xl font-bold text-blue-500 hover:underline">
                What I Use
              </a>
            </Link>
            <p>
              In this post I'll share what are some of the tools I use on a
              daily basis. This article is inspired by Wes Bos' /uses...
            </p>
          </section>
          <section>
            <Link href="/articles/2022-07/configure-vite-in-a-laravel-project">
              <a className="text-xl font-bold text-blue-500 hover:underline">
                Configure Vite in a Laravel Project
              </a>
            </Link>
            <p>
              Laravel has recently switched from Laravel Mix to Vite. All the
              projects in the ecosystem will be using Vite from now on...
            </p>
          </section>
        </ArticleContainer.ArticleBody>
      </ArticleContainer>
      <Footer />
    </div>
  );
}
