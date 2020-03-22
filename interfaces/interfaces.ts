export interface IState {
  notes: INote[],
  indexNote: number,
  indexTodo: number,
  undoStack: IStack
  redoStack: IStack
}

export interface INote {
  title: string;
  todos: ITodo[],
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
  items: any[];
  length: number;
  maxRange: number;

  constructor() {
    this.items = [];
    this.length = 0;
    this.maxRange = 128;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  isFull(): boolean {
    return this.length === this.maxRange;
  }

  push(item: any): void {
    if (this.isFull()) {
      throw new Error('Stack overflow');
    }
    this.items.push(item);
    this.length++;
  }

  pop(): any {
    if (this.isEmpty()) {
      throw new Error('Stack underflow');
    }

    this.length--;
    return this.items.pop();
  }

  clear(): void {
    this.length = 0;
    this.items = [];
  }

  top(): any {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }

    return this.items[this.length - 1];
  }
}
