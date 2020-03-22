export interface IState {
  notes: INote[]
}

export interface INote {
  title: string;
  todos: ITodo[],
  undoStack: IStack
  redoStack: IStack
}

export interface ITodo {
  checked: boolean,
  label: string
}

interface IStack {
  items: any[],
  length: number,
  maxRange: number,
  isEmpty(): boolean,
  push(item: any): void,
  pop(): any,
  top(): any,
  clear(): any
}

export class Stack implements IStack{
  items: any[] = [];
  length: number = 0;
  maxRange: number = 128;

  public isEmpty(): boolean {
    return this.length === 0;
  }

  public isFull(): boolean {
    return this.length === this.maxRange;
  }

  public push(item: any): void {
    if (this.isFull()) {
      throw new Error('Stack overflow');
    }

    this.items[this.length++] = item;
  }

  public pop(): any {
    if (this.isEmpty()) {
      throw new Error('Stack underflow');
    }

    return this.items[--this.length];
  }

  public clear(): void {
    while (!this.isEmpty()) {
      this.pop();
    }
  }

  public top(): any {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }

    return this.items[this.length - 1];
  }
}
