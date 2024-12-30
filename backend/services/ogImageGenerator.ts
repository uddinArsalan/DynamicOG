import { getTemplateJSX } from "../db/DbOperations.js";
import OGImageTemplate from "../utils/getJsx.js";
import { ImageResponse } from "@vercel/og";
import { html } from "satori-html";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

interface VNode {
  type: string;
  props: {
    style?: Record<string, any>;
    children?: string | VNode | VNode[];
    [prop: string]: any;
  };
}

export async function generate(
  selectedTemplateId: string,
  title: string,
  content: string,
  imageUrl: string | null,
  logoUrl: string | null
) {
  const jsxString = await getTemplateJSX(selectedTemplateId);
  const element = React.createElement(OGImageTemplate, {
    jsxString,
    content,
    title,
    imageUrl,
    logoUrl,
  });
  const htmlString = renderToStaticMarkup(element);
  const vNode = html(htmlString);
  const reactElement = processVNode(vNode);

  const ogImage = new ImageResponse(reactElement, {
    width: 1200,
    height: 630,
  });

  const imageBuffer = await ogImage.arrayBuffer();
  return Buffer.from(imageBuffer);
}

function processVNode(vnode: VNode): React.ReactElement {
  const { children, ...otherProps } = vnode.props;

  let processedChildren: React.ReactNode[] = [];

  if (children) {
    if (Array.isArray(children)) {
      processedChildren = children.map((child) =>
        typeof child === "string" ? child : processVNode(child as VNode)
      );
    } else if (typeof children === "object") {
      processedChildren = [processVNode(children as VNode)];
    } else if (typeof children === "string") {
      processedChildren = [children];
    }
  }

  return React.createElement(
    vnode.type,
    {
      ...otherProps,
      key: Math.random().toString(36).slice(2, 9),
    },
    ...processedChildren
  );
}
