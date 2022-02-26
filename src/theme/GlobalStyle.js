import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Rambla&family=Waiting+for+the+Sunrise&family=WindSong:wght@400;500&display=swap");

  :root {
    font-size: 62.5%;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: "Rambla", sans-serif;
    padding: 0;
    margin: 0;
    line-height: 1.5;
  }

  img {
    max-width: 100%;
  }
`;

export default GlobalStyle;
