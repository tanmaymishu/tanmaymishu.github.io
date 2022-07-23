import Link from "next/link";
import React, { FunctionComponent } from "react";

interface ArticleContainerProps {}
interface ArticleBodyProps {}
interface ArticleHeadingProps {
  title: string;
  date: string;
}

const ArticleContainer: FunctionComponent<ArticleContainerProps> & {
  ArticleBody: FunctionComponent<ArticleBodyProps>;
} & {
  ArticleHeading: FunctionComponent<ArticleHeadingProps>;
} = (props) => {
  return (
    <>
      <div className="mt-4 relative w-full px-6 py-12 bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 md:max-w-3xl md:mx-auto lg:max-w-4xl lg:pt-16 lg:pb-28">
        {props.children}
      </div>
    </>
  );
};

const ArticleHeading: FunctionComponent<ArticleHeadingProps> = (props) => {
  return (
    <>
      <section>
        <p className="text-blue-500 text-center hover:underline mt-4">
          <Link href={"/articles"}>← All Articles</Link>
        </p>
        <p className="font-bold text-3xl text-center">{props.title}</p>
        <p className="text-center text-gray-500 text-sm">{props.date}</p>
      </section>
    </>
  );
};

const ArticleBody: FunctionComponent<ArticleBodyProps> = (props) => {
  return (
    <>
      <div className="prose prose-slate mx-auto lg:prose-lg">
        {props.children}
      </div>
    </>
  );
};
ArticleContainer.ArticleHeading = ArticleHeading;
ArticleContainer.ArticleBody = ArticleBody;
export default ArticleContainer;
