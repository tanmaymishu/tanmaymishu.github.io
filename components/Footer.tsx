import React, { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = (props) => {
  return (
    <>
      <p className="mt-8 my-5 text-center text-base text-gray-400">
        &copy; {new Date().getFullYear()} Tanmay Mishu. All rights reserved.
      </p>
    </>
  );
};
export default Footer;
