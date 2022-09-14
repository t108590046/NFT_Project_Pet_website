import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MoralisProvider } from "react-moralis";
import App from "./App";

test("button test", () => {
  render(
    <MoralisProvider
      serverUrl="https://1mangfktwjyo.usemoralis.com:2053/server"
      appId="BfRq4IAT9rxq1loXwZhlZ8CWxRXXVFFOD3RXRCYT"
    >
      <App />
    </MoralisProvider>
  );
  expect(screen.getByText("you not login")).toBeVisible();
  expect(screen.getByRole("button")).toHaveTextContent("Connect Your Metamask");
});
