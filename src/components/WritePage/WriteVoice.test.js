import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import theme from "../../theme/theme";
import WriteVoice from "./WriteVoice";

describe("WriteVoice Component", () => {
  test("Should find recording start icon", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <WriteVoice />
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(getByTestId("start-icon"));
  });
});
