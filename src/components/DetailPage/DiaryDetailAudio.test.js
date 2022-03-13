import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import { EFFECT_MODE, SCRIPT_MODE } from "../../constants/";
import theme from "../../theme/theme";
import DiaryDetailAudio from "./DiaryDetailAudio";

const mockData = {
  createdBy: "1",
  audioURL: "http://aws.s3/",
  script: "hello my name is Sammy nice to meet you how's it going",
  sentiment: 3,
  createdAt: "2022-03-13T13:38:07.457Z",
};

describe("DiaryDetailAudio Component", () => {
  test("Should find canvas on Effect Mode", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <DiaryDetailAudio mode={EFFECT_MODE} diary={mockData} />
      </ThemeProvider>
    );

    expect(getByTestId("canvas")).toBeInTheDocument();
  });

  test("Should find script of diary on Script Mode", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <DiaryDetailAudio mode={SCRIPT_MODE} diary={mockData} />
      </ThemeProvider>
    );

    expect(getByText(mockData.script)).toBeInTheDocument();
  });

  test("Should find audio slider", () => {
    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <DiaryDetailAudio mode={SCRIPT_MODE} diary={mockData} />
      </ThemeProvider>
    );

    expect(getByRole("slider")).toBeInTheDocument();
  });

  test("Should find audio slider", () => {
    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <DiaryDetailAudio mode={SCRIPT_MODE} diary={mockData} />
      </ThemeProvider>
    );

    expect(getByRole("slider")).toBeInTheDocument();
  });
});
