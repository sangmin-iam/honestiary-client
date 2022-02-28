import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 62.5%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Rambla", sans-serif;
    line-height: 1.5;
  }

  img {
    max-width: 100%;
  }

  ul {
    list-style-type: none;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
