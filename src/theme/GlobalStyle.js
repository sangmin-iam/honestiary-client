import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 62.5%;

    @media only screen and (max-width: ${({ theme }) => theme.devices.laptop}){
      font-size: 56.25%;
    }

    @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}){
      font-size: 50%;
    }
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Rambla", sans-serif;
    line-height: 1.5;
    background-color: ${({ theme }) => theme.colors.offWhite};
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
    -webkit-user-drag: none;
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
