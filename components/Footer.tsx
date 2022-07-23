import React, { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = (props) => {
  return (
    <>
      <div className="mt-4">
        <hr />
        <p className="mt-8 my-5 text-center text-base text-gray-400">
          &copy; {new Date().getFullYear()} Tanmay Mishu.
        </p>
      </div>
    </>
  );
};
export default Footer;
