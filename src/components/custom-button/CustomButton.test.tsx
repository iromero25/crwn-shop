import CustomButton from "./CustomButton";
import { render, screen, fireEvent } from "@testing-library/react";

test("button has the CustomButton class initially", () => {
  render(
    <CustomButton>
      <span>Test Button</span>
    </CustomButton>
  );
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass("custom-button");
  expect(button).toHaveStyle({ backgroundColor: "black" });
  expect(button).toHaveStyle({ color: "white" });

  fireEvent.mouseOver(button);
  expect(button).toHaveStyle({ backgroundColor: "white" });
  expect(button).toHaveStyle({ color: "black" });
});
