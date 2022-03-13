import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 62.5%;

    @media only screen and (max-width: ${({ theme }) => theme.devices.laptopM}){
      font-size: 59.5%;
    }

    @media only screen and (max-width: ${({ theme }) => theme.devices.laptopS}){
      font-size: 56.25%;
    }

    @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}){
      font-size: 52%;
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
    font-size: 2rem;

    @media only screen and (max-width: ${({ theme }) => theme.devices.laptopM}){
      font-size: 1.9rem;
    }

    @media only screen and (max-width: ${({ theme }) => theme.devices.laptopS}){
      font-size: 1.8rem;
    }

    @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}){
      font-size: 1.7rem;
    }
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 400;

    @media only screen and (max-width: ${({ theme }) => theme.devices.laptopM}){
      font-size: 3.25rem;
    }

    @media only screen and (max-width: ${({ theme }) => theme.devices.laptopS}){
      font-size: 3rem;
    }

    @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}){
      font-size: 2.75rem;
    }
  }

  h2 {
    font-size: 3rem;
    font-weight: 400;

    @media only screen and (max-width: ${({ theme }) => theme.devices.laptopM}){
      font-size: 2.75rem;
    }

    @media only screen and (max-width: ${({ theme }) => theme.devices.laptopS}){
      font-size: 2.5rem;
    }

    @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}){
      font-size: 2.25rem;
    }
  }

  h3 {
    font-size: 2.5rem;
    font-weight: 400;

    @media only screen and (max-width: ${({ theme }) => theme.devices.laptopM}){
      font-size: 2.25rem;
    }

    @media only screen and (max-width: ${({ theme }) => theme.devices.laptopS}){
      font-size: 2rem;
    }

    @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}){
      font-size: 1.75rem;
    }
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
