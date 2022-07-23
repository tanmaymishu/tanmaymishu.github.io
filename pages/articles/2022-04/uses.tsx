import Head from "next/head";
import Link from "next/link";
import React, { FunctionComponent } from "react";
import ArticleContainer from "../../../components/ArticleContainer";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";

interface UsesProps {}

const Uses: FunctionComponent<UsesProps> = (props) => {
  return (
    <>
      <Head>
        <title>What I Use</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="In this post I'll share what are some of the tools I use on a daily basis. This article is inspired by Wes Bos' /uses."
        />

        <meta property="og:title" content="What I Use" key="title" />
        <meta
          property="og:description"
          content="In this post I'll share what are some of the tools I use on a daily basis. This article is inspired by Wes Bos' /uses."
        />
        <meta
          property="og:url"
          content="https://tanmaydas.com/articles/2022-04/uses"
        />
        <meta property="og:type" content="website" />
      </Head>
      <Navbar />
      <ArticleContainer>
        <ArticleContainer.ArticleBody>
          <ArticleContainer.ArticleHeading
            title="What I Use"
            date="April 26, 2022"
          ></ArticleContainer.ArticleHeading>
          <div className="leading-loose">
            <p className="mt-4">
              In this post I'll share what are some of the tools I use on a
              daily basis. This article is inspired by Wes Bos'{" "}
              <a
                className="text-blue-500"
                target="_blank"
                href="https://wesbos.com/uses"
              >
                /uses.
              </a>
            </p>

            <p className="font-semibold text-xl">Development</p>
            <ul className="">
              <li className="list-disc">
                <a
                  target="_blank"
                  href="https://apple.com/macos"
                  className="underline font-semibold text-blue-500"
                >
                  macOS
                </a>
                <p>
                  Most of my development work is done on a macOS. Stable,
                  developer-friendly, most of the dev tools are available for
                  macOS. Can't complain.
                </p>
              </li>
              <li className="list-disc">
                <a
                  target="_blank"
                  href="https://usenimbus.com"
                  className="underline font-semibold text-blue-500"
                >
                  Nimbus
                </a>
                <p>
                  When I need to offload some memory-consuming programs, like
                  docker and kubernetes I use Nimbus. It's a great tool for
                  developing on the cloud.
                </p>
              </li>
              <li className="list-disc">
                <a
                  target="_blank"
                  href="https://code.visualstudio.com"
                  className="underline font-semibold text-blue-500"
                >
                  Visual Studio Code
                </a>
                <p>
                  For most of my projects, I use VSCode as my primary text
                  editor. I use the{" "}
                  <a
                    target="_blank"
                    href="https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme"
                    className="underline italic"
                  >
                    Github Light Default
                  </a>{" "}
                  theme and the{" "}
                  <a
                    href="https://www.ibm.com/plex/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline italic"
                  >
                    IBM Plex Mono
                  </a>{" "}
                  font. Before switching to IBM Plex Mono, I had been using{" "}
                  <a
                    className="underline italic"
                    href="https://www.jetbrains.com/lp/mono/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Jetbrains Mono
                  </a>{" "}
                  font since the day it was released. Both of these fonts are
                  great.
                </p>
              </li>
              <li className="list-disc">
                <a
                  target="_blank"
                  href="https://coderunnerapp.com/"
                  className="underline font-semibold text-blue-500"
                >
                  CodeRunner
                </a>
                <p>
                  For quickly testing a code snippet, I use CodeRunner. It
                  supports many different languages.
                </p>
              </li>
              <li className="list-disc">
                <a
                  target="_blank"
                  href="https://tableplus.com"
                  className="underline font-semibold text-blue-500"
                >
                  TablePlus
                </a>
                <p>
                  I use TablePlus for managing all of my databases. In a world
                  full of memory-consuming electron apps, I find TablePlus to be
                  the most reliable as it uses the OS-provided native API.
                </p>
              </li>
              <li className="list-disc">
                <a
                  target="_blank"
                  href="https://www.postman.com/downloads/postman-agent/"
                  className="underline font-semibold text-blue-500"
                >
                  Postman Agent
                </a>
                <p>
                  I use Postman Agent to test my API endpoints. I prefer the
                  lightweight Postman Agent over the full-featured Postman
                  because then I have one less Electron app on my machine.
                  Postman Agent only creates a bridge between the web UI and the
                  local network.
                </p>
              </li>
              <li className="list-disc">
                <a
                  target="_blank"
                  href="https://warp.dev"
                  className="underline font-semibold text-blue-500"
                >
                  Warp
                </a>
                <p>
                  For terminal, I have recently switched from Iterm2 to Warp.
                  Warp has many features like natural text editing, bookmarking
                  and output sharing etc.
                </p>
              </li>
              <li className="list-disc">
                <a
                  target="_blank"
                  href="https://brave.com"
                  className="underline font-semibold text-blue-500"
                >
                  Brave
                </a>
                <p>
                  I use Brave as my primary web browser for both development and
                  browsing despite it's controversial crypto-mania. I haven't
                  run into any issues so far because crypto is an opt-in feature
                  of Brave and I never opted-in.
                </p>
              </li>
            </ul>
            <p className="font-semibold text-xl">Productivity</p>
            <ul className="">
              <li className="list-disc">
                <a
                  target="_blank"
                  href="https://alfredapp.com"
                  className="underline font-semibold text-blue-500"
                >
                  Alfred
                </a>
                <p>
                  I use Alfred workflow to quickly peek at developer
                  documentations, find synonyms/antonyms, quickly access github
                  repo/pr etc.
                </p>
              </li>
              <li className="list-disc">
                <a
                  target="_blank"
                  href="https://mindnode.com"
                  className="underline font-semibold text-blue-500"
                >
                  MindNode
                </a>
                <p>When I need to organize my thoughts, I use MindNode.</p>
              </li>
              <li className="list-disc">
                <a
                  target="_blank"
                  href="https://notion.so"
                  className="underline font-semibold text-blue-500"
                >
                  Notion
                </a>
                <p>
                  I use Notion heavily for note-taking and to-do lists. Notion
                  is an amazing app.
                </p>
              </li>
              <li className="list-disc">
                <a
                  target="_blank"
                  href="https://tapbots.com/pastebot/"
                  className="underline font-semibold text-blue-500"
                >
                  Pastebot
                </a>
                <p>
                  Everyone should use a clipboard manager. I use Tapbots
                  Pastebot for managing my clipboard content. It saved me from
                  many accidental copy overwrites.
                </p>
              </li>
              <li className="list-disc">
                <a
                  target="_blank"
                  href="https://whimsical.com/"
                  className="underline font-semibold text-blue-500"
                >
                  Whimsical
                </a>
                <p>
                  Whimsical is very useful when I quickly need to create a
                  flowchart or a mockup.
                </p>
              </li>
            </ul>
          </div>
        </ArticleContainer.ArticleBody>
      </ArticleContainer>
      <Footer />
    </>
  );
};
export default Uses;
