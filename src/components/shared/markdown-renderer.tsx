import Markdown from "react-markdown";

const MarkDownRenderer = ({ content }: { content: string }) => {
  return (
    <div className="markdown">
      <Markdown>{content}</Markdown>
    </div>
  );
};

export default MarkDownRenderer;
