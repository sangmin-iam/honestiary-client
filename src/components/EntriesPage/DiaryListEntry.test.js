import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { format } from "date-fns";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import theme from "../../theme/theme";
import { DATE_FORMAT } from "../../constants/date";
import { makeEmojiBasedOnSentimenScore } from "../../utils/diary";
import DiaryListEntry from "./DiaryListEntry";

const mockData = {
  createdBy: "1",
  audioURL: "http://aws.s3/",
  script: "hello my name is Sammy nice to meet you how's it going",
  sentiment: 3,
  createdAt: "2022-03-13T13:38:07.457Z",
};

describe("DiaryListEntry Component", () => {
  test("Should find script", () => {
    const { getByText } = render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <DiaryListEntry
            id={mockData.id}
            script={mockData.script}
            createdAt={mockData.createdAt}
            sentiment={mockData.sentiment}
          />
        </ThemeProvider>
      </BrowserRouter>
    );

    const script = mockData.script;

    expect(getByText(script)).toBeInTheDocument();
  });

  test("Should find emoji based on sentiment", () => {
    const { getByText } = render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <DiaryListEntry
            id={mockData.id}
            script={mockData.script}
            createdAt={mockData.createdAt}
            sentiment={mockData.sentiment}
          />
        </ThemeProvider>
      </BrowserRouter>
    );

    const emoji = makeEmojiBasedOnSentimenScore(mockData.sentiment);

    expect(getByText(emoji)).toBeInTheDocument();
  });

  test("Should find formatted date and time", () => {
    const { getByText } = render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <DiaryListEntry
            id={mockData.id}
            script={mockData.script}
            createdAt={mockData.createdAt}
            sentiment={mockData.sentiment}
          />
        </ThemeProvider>
      </BrowserRouter>
    );

    const formattedTime = format(new Date(mockData.createdAt), "p E");
    const formattedDate = format(
      new Date(mockData.createdAt),
      DATE_FORMAT.YYYY_MM_DD
    );

    expect(getByText(formattedTime)).toBeInTheDocument();
    expect(getByText(formattedDate)).toBeInTheDocument();
  });

  test("Should find delete X", () => {
    const { getByText } = render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <DiaryListEntry
            id={mockData.id}
            script={mockData.script}
            createdAt={mockData.createdAt}
            sentiment={mockData.sentiment}
          />
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(getByText("X", { exact: true })).toBeInTheDocument();
  });

  test("Should find DeleteModal after clicking X", () => {
    const { getByText } = render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div id="portal-root"></div>
          <DiaryListEntry
            id={mockData.id}
            script={mockData.script}
            createdAt={mockData.createdAt}
            sentiment={mockData.sentiment}
          />
        </ThemeProvider>
      </BrowserRouter>
    );

    userEvent.click(getByText("X", { exact: true }));

    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByText("Delete")).toBeInTheDocument();
  });
});
