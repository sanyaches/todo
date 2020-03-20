import { IState, Stack } from "@/interfaces/interfaces";

const state = (): IState => ({
  notes: [],
  stack: new Stack()
});

export default state;
