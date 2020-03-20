import { IState, INote, ITodo } from "@/interfaces/interfaces";

const mutations = {
  addNote(state: IState) {
    const newNote: INote = {
      title: "New todo list",
      todos: [{
        checked: false,
        label: 'New todo'
      }]
    };

    state.notes.push(newNote)
  },

  setNotes(state: IState, payload: INote[]) {
    state.notes = payload
  },

  setNote(state: IState, payload: {
    newNote: INote,
    index: number
  }) {
    state.notes[payload.index] = payload.newNote
  },

  addTodo(state: IState, payload = <{
    indexNote: number,
    newTodo: ITodo
  }> {}) {
    const index = payload.indexNote,
          todo = payload.newTodo;

    state.notes[index].todos.push(todo)
  },

  deleteNote(state: IState, indexStart: number) {
    state.notes.splice(indexStart, 1)
  },

  addChange(state: IState, change: any) {
    state.stack.push(change)
  },

  returnChange(state: IState) {
    state.stack.pop()
  }
};

export default mutations;
