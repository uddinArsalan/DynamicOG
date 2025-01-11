import JsxParser from "react-jsx-parser";

interface TemplateDataType {
  imageUrl: string;
  logoUrl: string;
  title: string;
  content: string;
  jsxString: string;
}
const TemplatePreview = ({
  imageUrl,
  logoUrl,
  title,
  content,
  jsxString,
}: TemplateDataType) => {
  return (
    <div className="w-full overflow-hidden">
      <div className="relative w-full pb-[60%]">
        <div className="absolute inset-0 scale-[0.4] transform origin-top-left">
          <div className="w-[250%] h-[250%]">
            <JsxParser
              jsx={jsxString}
              bindings={{
                title,
                content,
                imageUrl,
                logoUrl,
              }}
              // components={{
              //   div: ({
              //     style,
              //     ...rest
              //   }: React.HTMLAttributes<HTMLDivElement>) => (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
