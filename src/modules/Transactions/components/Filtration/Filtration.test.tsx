import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../../../test/customRender";
import Filtration from "./Filtration";

describe("Component: Filtration", () => {
  it("should render", async () => {
    render(<Filtration />);
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText<HTMLInputElement>(/search/i)
      ).toBeInTheDocument();
    });
  });

  it("should enter search query", async () => {
    render(<Filtration />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/search/i);
    fireEvent.change(input, { target: { value: "taxes" } });
    await waitFor(() => {
      expect(input.value).toBe("taxes");
    });
  });
});
