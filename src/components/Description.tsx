// DescriptionComponent.tsx
import React from "react";
import { DataItem } from "../types";
import Markdown from "react-markdown";

const DescriptionComponent: React.FC<DataItem> = ({ title, bodyText }) => {
  return (
    <div className="description-page">
      <h1 className="description-head">{title}</h1>
      <p className="description-body">
        <Markdown>{bodyText}</Markdown>
      </p>
    </div>
  );
};

export default DescriptionComponent;
