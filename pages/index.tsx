import type { NextPage } from "next";
import Head from "next/head";
import ArticleList from "../components/ArticleList";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tanmay Mishu</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Tanmay Mishu" key="title" />
        <meta
          name="description"
          content="Tanmay Mishu is a full-stack software developer."
        />

        <meta
          property="og:title"
          content="Tanmay Mishu's Website"
          key="title"
        />
        <meta
          property="og:description"
          content="Tanmay Mishu is a full-stack software developer."
        />
        <meta property="og:image" content="https://tanmaydas.com/tanmay.png" />
        <meta property="og:url" content="https://tanmaydas.com" />
        <meta property="og:type" content="website" />
      </Head>
      <Navbar />
      <section className="container mx-auto px-8">
        <Hero />
        <ArticleList />
        <Footer />
      </section>
    </>
  );
};

export default Home;
