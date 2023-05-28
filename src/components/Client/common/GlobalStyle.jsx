import { Global, css } from "@emotion/react";
import React from "react";

const resetStyle = css`
  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    color: var(--text-color);
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    color: var(--text-color);
  }

  html,
  body {
    overflow-x: hidden;
  }
`;

const defaultStyle = css`
  :root {
    body {
      --bgc: #f0f0f0;
      --header-color: #86745b;
      --primary-color: #a7a296;
      --detail-view-color: #dddddd;
      --footer-color: #edeae3;
      --cta-color: #4d4021;
      --text-color: rgba(49, 46, 46, 0.8);
      --text2-color: rgba(49, 46, 46, 0.62);
      --base-size: 16px;
      --sm-size: 14px;
      --lg-size: 18px;
      --xlg-size: 25px;
      --transparent-border: 1px solid rgba(49, 46, 46, 0.124);
    }
  }
`;

const GlobalStyle = () => {
  return (
    <>
      <Global styles={resetStyle}>GlobalStyle</Global>
      <Global styles={defaultStyle}>GlobalStyle</Global>
    </>
  );
};

export default GlobalStyle;
