import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import userEvent from "@testing-library/user-event";

import theme from "../../theme/theme";
import Modal from "./Modal";

describe("Modal Component", () => {
  test("Should find text in children", () => {
    const CHILDREN_TEXT = "Test Modal";

    render(<div id="portal-root"></div>);
    const { getByText } = render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Modal>{CHILDREN_TEXT}</Modal>
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(getByText(CHILDREN_TEXT)).toBeInTheDocument();
  });

  test("onClick func should be called when overlay clicked", () => {
    const onClick = jest.fn();

    render(<div id="portal-root"></div>);
    const { getByTestId } = render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Modal onClick={onClick} />
        </ThemeProvider>
      </BrowserRouter>
    );

    userEvent.click(getByTestId("overlay"));

    expect(onClick).toHaveBeenCalled();
  });
});
