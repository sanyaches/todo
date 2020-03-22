import { IState, Stack } from "@/interfaces/interfaces";

const state = (): IState => ({
  notes: [],
  indexNote: 0,
  indexTodo: 0,
  undoStack: new Stack(),
  redoStack: new Stack()
});

export default state;
