import React, { FunctionComponent } from "react";
import AllArticles from "../../components/AllArticles";
import Navbar from "../../components/Navbar";

interface ArticlesProps {}

const Articles: FunctionComponent<ArticlesProps> = (props) => {
  return (
    <>
      <Navbar />
      <section className="container mx-auto px-8">
        <AllArticles />
      </section>
    </>
  );
};
export default Articles;
