import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Main>
    </>
  );
}

const Main = styled.div`
  background-color: ${({ theme }) => theme.colors.offWhite};
`;

export default App;
