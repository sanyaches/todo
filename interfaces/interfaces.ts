export interface IState {
  notes: INote[]
}

export interface INote {
  title: string;
  todos: ITodo[]
}

export interface ITodo {
  checked: boolean,
  label: string
}
