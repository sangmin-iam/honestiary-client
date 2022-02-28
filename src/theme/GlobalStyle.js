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

  h1 {
    font-size: 3rem;
    font-weight: 400;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 400;
  }

  h3 {
    font-size: 2rem;
    font-weight: 400;
  }

  img {
    max-width: 100%;
  }

  ul {
    list-style-type: none;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }
`;

export default GlobalStyle;
