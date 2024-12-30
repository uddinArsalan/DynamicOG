import React from "react";
import JsxParser from "react-jsx-parser/dist/react-jsx-parser.min.js";

interface OgImageTemplateProps {
  jsxString: string;
  title: string;
  content: string;
  imageUrl: string | null;
  logoUrl: string | null;
}

export const OgImageTemplate = ({
  jsxString,
  title,
  content,
  imageUrl,
  logoUrl,
}: OgImageTemplateProps) => (
  <JsxParser
    jsx={jsxString}
    bindings={{
      title,
      content,
      imageUrl,
      logoUrl,
    }}
    // components={{
    //   div: ({ style, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
    //     <div
    //       style={{
    //         ...style,
    //         backgroundImage: style?.backgroundImage
    //           ? `url(${imageUrl})`
    //           : undefined,
    //       }}
    //       {...rest}
    //     />
    //   ),
    // }}
    renderInWrapper={false}
  />
);

export default OgImageTemplate;
