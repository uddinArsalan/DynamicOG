declare module 'react-jsx-parser/dist/react-jsx-parser.min.js' {
  import React from 'react';
  
  interface JsxParserProps {
    jsx: string;
    bindings?: Record<string, any>;
    components?: Record<string, React.ComponentType<any>>;
    renderInWrapper?: boolean;
    [key: string]: any;
  }

  class JsxParser extends React.Component<JsxParserProps> {}

  export default JsxParser;
}
  