import React from "react";

interface HtmlRendererProps {
  htmlString: string;
  className: string;
}

const HtmlRenderer: React.FC<HtmlRendererProps> = ({
  htmlString,
  className,
}) => {
  return (
    <span
      className={`${className} prose`} // You can apply Tailwind CSS classes for styling
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
};

export default HtmlRenderer;
