import React, { FunctionComponent, useEffect, useRef } from "react";

interface CommentProps {}

const Comment: FunctionComponent<CommentProps> = (props) => {
  const body = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let script = document.createElement("script");
    script.setAttribute("src", "https://utteranc.es/client.js");
    script.setAttribute("repo", "tanmaymishu/tanmaymishu.github.io");
    script.setAttribute("issue-term", "title");
    script.setAttribute("label", "comment");
    script.setAttribute("theme", "github-light");
    script.setAttribute("crossorigin", "anonymous");
    // script.setAttribute("async", "true");
    body.current?.appendChild(script);
  }, []);
  return (
    <>
      <div ref={body} className="mt-4">
        <hr></hr>
      </div>
    </>
  );
};
export default Comment;
