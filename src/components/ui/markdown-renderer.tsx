import { cn } from "@/lib/utils";
import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const parseLine = (line: string) => {
    const colonIndex = line?.indexOf(":");
    if (colonIndex !== -1) {
      const title = line?.substring(0, colonIndex + 1); // Include the colon in the title
      const text = line?.substring(colonIndex + 1).trim();
      return (
        <p className="text-justify mt-3">
          <span className={cn`font-semibold mr-2`}>{title}</span>
          {text}
        </p>
      );
    }
    return <p>{line}</p>;
  };

  const renderers = {
    p: ({ node, ...props }: any) => parseLine(props.children as string),
  };

  return (
    <div>
      <ReactMarkdown components={renderers}>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
