import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../test/customRender";
import FilterMenu from "./FilterMenu";

describe("Component: FilterMenu", () => {
  it("should render", async () => {
    render(<FilterMenu />);
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText<HTMLInputElement>(/search/i)
      ).toBeInTheDocument();
    });
  });

  it("should enter search query", async () => {
    render(<FilterMenu />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/search/i);
    fireEvent.change(input, { target: { value: "taxes" } });
    await waitFor(() => {
      expect(input.value).toBe("taxes");
    });
  });
});
