import { render, screen } from "@testing-library/react";
import ShowTodo from "./Todo";

test("show one todo", () => {
  const onClickDelete = () => {};
  const onClickComplete = () => {};

  const todo = {
    text: "Testing Todo component",
    done: false,
  };

  render(
    <ShowTodo
      todo={todo}
      onClickDelete={onClickDelete}
      onClickComplete={onClickComplete}
    />
  );

  const fullView = screen.getByText("Testing Todo component");
  expect(fullView);
});
