import React from "react";
import { DataItem } from "../types";
import MarkdownIt from "markdown-it";
import emoji from "markdown-it-emoji";
import subscript from "markdown-it-sub";
import superscript from "markdown-it-sup";
import ins from "markdown-it-ins";
import mark from "markdown-it-mark";
import footnote from "markdown-it-footnote";
import deflist from "markdown-it-deflist";
import abbr from "markdown-it-abbr";
import container from "markdown-it-container";
import twemoji from "twemoji";
import hljs from "highlight.js"; // import highlight.js
import checkbox from "markdown-it-checkbox";
import anchor from "markdown-it-anchor";
import toc from "markdown-it-table-of-contents";
import "highlight.js/styles/monokai.css";
import alert from "markdown-it-alert";

const md = new MarkdownIt({
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }
    return ""; // use external default escaping
  },
})
  .use(emoji, {
    render: function (token, idx) {
      return twemoji.parse(token[idx].content);
    },
  })
  .use(subscript)
  .use(superscript)
  .use(ins)
  .use(mark)
  .use(footnote)
  .use(deflist)
  .use(abbr)
  .use(container)
  .use(checkbox)
  .use(anchor)
  .use(toc)
  .use(alert);

const DescriptionComponent: React.FC<DataItem> = ({ title, bodyText }) => {
  return (
    <div className="description-page">
      <h1 className="description-head">{title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: md.render(bodyText) }}
        className="description-body"
      />
    </div>
  );
};

export default DescriptionComponent;
