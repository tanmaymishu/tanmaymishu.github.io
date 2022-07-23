import React, { FunctionComponent } from "react";
import Typewriter from "typewriter-effect";
import GithubIcon from "./GithubIcon";
import LinkedInIcon from "./LinkedInIcon";
import MailIcon from "./MailIcon";
import StackOverflowIcon from "./StackOverflowIcon";
import TwitterIcon from "./TwitterIcon";

interface HeroProps {}

const Hero: FunctionComponent<HeroProps> = (props) => {
  return (
    <>
      <hr className="my-5 w-full h-1 bg-blue-500"></hr>
      <section className="flex relative">
        <div>
          <section className="text-gray-700 text-2xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-9xl leading-normal md:leading-normal lg:leading-relaxed xl:leading-relaxed 2xl:leading-loose">
            <div>
              Hi, I am{" "}
              <span className="font-semibold text-blue-700">Tanmay</span>.
            </div>
            <div>Software Engineer.</div>
            <div>
              I build things with{" "}
              <section className="font-semibold inline-block">
                <Typewriter
                  options={{
                    strings: [
                      "Tailwind.",
                      "TypeScript.",
                      "NodeJS.",
                      "ReactJS.",
                      "VueJS.",
                      "Laravel.",
                      "MySQL.",
                      "PostgreSQL.",
                      "MongoDB.",
                      "Redis.",
                      "Docker.",
                      "Kubernetes.",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </section>
            </div>
          </section>
        </div>
        <div className="absolute right-0 top-5">
          <img
            src="tanmay.png"
            className="rounded-full w-20 sm:w-24 md:w-32 lg:w-60 xl:w-80"
          />
        </div>
      </section>
      <hr className="my-5 w-full h-1 bg-blue-500"></hr>

      <section className="flex flex-row-reverse">
        <a target="_blank" href="mailto:tanmaymishu@gmail.com">
          <MailIcon />
        </a>
        <a target="_blank" href="https://linkedin.com/in/tanmaymishu">
          <LinkedInIcon />
        </a>
        <a target="_blank" href="https://twitter.com/tanmaymishu">
          <TwitterIcon />
        </a>
        <a target="_blank" href="https://github.com/tanmaymishu">
          <GithubIcon />
        </a>
        <a
          target="_blank"
          href="https://stackoverflow.com/users/2594250/tanmay"
        >
          <StackOverflowIcon />
        </a>
      </section>
    </>
  );
};
export default Hero;
