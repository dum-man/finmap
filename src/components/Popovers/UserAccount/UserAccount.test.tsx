import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../test/customRender";
import UserAccount from "./UserAccount";

describe("Component: UserAccount", () => {
  it("should render", async () => {
    render(<UserAccount setOpen={() => {}} parentRef={null} />);
    await waitFor(() => {
      expect(screen.getByText(/accountType/i)).toBeInTheDocument();
    });
  });
});
