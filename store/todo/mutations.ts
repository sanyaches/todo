import { IState, Note, Todo } from "./interfaces";

const mutations = {
  addNote(state: IState) {
    const newNote: Note = {
      title: "New todo list",
      todos: [{
        checked: false,
        label: 'First task'
      }]
    };

    state.notes.push(newNote)
  },

  addTodo(state: IState, payload = <{
    indexNote: number,
    newTodo: Todo
  }> {}) {
    const index = payload.indexNote,
          todo = payload.newTodo;

    state.notes[index].todos.push(todo)
  },

  deleteNote(state: IState, indexStart: number) {
    state.notes.splice(indexStart, 1)
  }
};

export default mutations;
