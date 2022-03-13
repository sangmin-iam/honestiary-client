import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import theme from "../../theme/theme";
import SuccessModal from "./SuccessModal";

describe("SuccessModal Component", () => {
  test("Should find heading and message text", () => {
    const HEADING = "Great";
    const MESSAGE = "Test was successful";

    render(<div id="portal-root"></div>);
    const { getByText } = render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SuccessModal heading={HEADING} message={MESSAGE} />
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(getByText(HEADING)).toBeInTheDocument();
    expect(getByText(MESSAGE)).toBeInTheDocument();
  });

  test("Should find text in children", () => {
    const CHILDREN_TEXT = "This is children text";

    render(<div id="portal-root"></div>);
    const { getByText } = render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SuccessModal>{CHILDREN_TEXT}</SuccessModal>
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(getByText(CHILDREN_TEXT)).toBeInTheDocument();
  });
});
