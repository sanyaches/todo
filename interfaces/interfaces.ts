export interface IState {
  notes: INote[]
}

export interface INote {
  title: string;
  todos: ITodo[],
  stack: IStack
}

export interface ITodo {
  checked: boolean,
  label: string
}

interface IStack {
  items: any[],
  length: number,
  isEmpty(): boolean,
  push(item: any): void,
  pop(): any,
  top(): any,
}

export class Stack implements IStack{
  items: any[] = [];
  length: number = 0;

  public isEmpty(): boolean {
    return this.length === 0;
  }

  public push(item: any): void {
    this.items[this.length++] = item;
  }

  public pop(): any {
    if (this.isEmpty()) {
      throw new Error('Stack underflow');
    }

    return this.items[--this.length];
  }

  public top(): any {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }

    return this.items[this.length - 1];
  }
}
