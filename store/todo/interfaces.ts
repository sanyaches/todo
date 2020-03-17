export interface IState {
  notes: Note[]
}

export interface Note {
  title: string;
  todos: Todo[]
}

export interface Todo {
  checked: boolean,
  label: string
}
