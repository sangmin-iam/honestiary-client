import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import theme from "../../theme/theme";
import DiaryDetail from "./DiaryDetail";

describe("DiaryDetail Component", () => {
  test("Should find Effect Mode Button", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <DiaryDetail />
      </ThemeProvider>
    );

    expect(getByText(/Effect Mode/i)).toBeInTheDocument();
  });

  test("Should find Script Mode Button", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <DiaryDetail />
      </ThemeProvider>
    );

    expect(getByText(/Script Mode/i)).toBeInTheDocument();
  });
});
