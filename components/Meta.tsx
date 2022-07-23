import Head from "next/head";
import React, { FunctionComponent, useEffect, useState } from "react";

interface MetaProps {
  title: string;
  description: string;
  image?: string;
  url: string;
}

const Meta: FunctionComponent<MetaProps> = (props) => {
  const [title, setTitle] = useState("");
  useEffect(() => {
    // return () => {
    console.log("here");
    setTitle(props.title);
    // };
  }, [props.title]);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={props.description} />

        <meta property="og:title" content={props.title} key="title" />
        <meta property="og:description" content={props.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={props.url} />
        <meta property="og:image" content={props.image} />
      </Head>
    </>
  );
};
export default Meta;
