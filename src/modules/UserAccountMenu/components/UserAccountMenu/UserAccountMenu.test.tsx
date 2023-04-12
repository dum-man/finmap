import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../../test/customRender";
import UserAccountMenu from "./UserAccountMenu";

describe("Component: UserAccountMenu", () => {
  it("should render", async () => {
    render(
      <UserAccountMenu
        onClose={() => {}}
        setSetUsernameOpen={() => {}}
        parentRef={null}
      />
    );
    await waitFor(() => {
      expect(screen.getByText(/accountType/i)).toBeInTheDocument();
    });
  });
});
