// DescriptionComponent.tsx
import React from "react";
import { DataItem } from "../types";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkFootnotes from "remark-footnotes";
import remarkDeflist from "remark-deflist";
import remarkEmoji from "remark-emoji";
import remarkIns from "remark-ins";
import rehypeRaw from "rehype-raw";
// import remarkMark from "remark-mark";
// import remarkSubSuper from "remark-sub-super";

const DescriptionComponent: React.FC<DataItem> = ({ title, bodyText }) => {
  const renderers = {
    text: (textProps) => {
      const { value } = textProps;
      const regexSub = /~([^~]+)~/g;
      const regexSuper = /\^([^^]+)\^/g;
      const newText = value
        .replace(regexSub, "<sub>$1</sub>")
        .replace(regexSuper, "<sup>$1</sup>");
      return <span dangerouslySetInnerHTML={{ __html: newText }} />;
    },
  };
  return (
    <div className="description-page">
      <h1 className="description-head">{title}</h1>
      <p className="description-body">
        <Markdown
          children={bodyText}
          rehypePlugins={[rehypeRaw]}
          // renderers={renderers}
          remarkPlugins={[
            remarkGfm,
            remarkEmoji,
            remarkFootnotes,

            remarkDeflist,
            remarkIns,

            // remarkMark
          ]}
          // rehypePlugins={[rehypeKatex]}
          // plugins={[]}
          // renderers={{
          //   sub: "sub",
          //   sup: "sup",
          // }}
          components={{
            renderers: renderers,
            code: function code(props) {
              const { children, className, node, ...rest } = props;

              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  children={String(children).replace(/\n$/, "")}
                  style={dark}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
          skipHtml={false} // by default, security reasons
        />
      </p>
    </div>
  );
};

export default DescriptionComponent;
