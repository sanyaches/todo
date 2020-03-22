import {IState, INote, ITodo, Stack} from "@/interfaces/interfaces";

const mutations = {
  addNote(state: IState) {
    const newNote: INote = {
      title: "New todo list",
      todos: [{
        checked: false,
        label: 'New todo'
      }],
    };

    state.notes.push(newNote)
  },

  initStacks(state: IState) {
    state.undoStack = new Stack();
    state.redoStack = new Stack();
  },

  setIndex(state: IState, index: number) {
    state.indexNote = +index
  },

  setIndexTodo(state: IState, index: number) {
    state.indexTodo = +index
  },

  changeCheckTodo(state: IState) {
    state.notes[state.indexNote].todos[state.indexTodo].checked = !state.notes[state.indexNote].todos[state.indexTodo].checked;
  },

  setNotes(state: IState, payload: INote[]) {
    state.notes = payload
  },

  setNote(state: IState, newNote: INote) {
    state.notes[state.indexNote] = newNote
  },

  deleteNote(state: IState, indexStart: number) {
    state.notes.splice(indexStart, 1);
  },

  push(state: IState, payload: {
    value: INote,
    stack?: string
  }) {
    payload.stack === 'redo' ?
      state.redoStack.push(payload.value) :
      state.undoStack.push(payload.value);
  },

  pop(state: IState, payload: {
    stack?: string
  }) {
    if (payload.stack === 'redo') {
      return state.redoStack.pop()
    } else {
      return state.undoStack.pop()
    }
  },

  clear(state: IState, payload: {
    stack?: string
  }) {
    if (payload.stack === 'redo') {
      return state.redoStack.clear()
    } else {
      return state.undoStack.clear()
    }
  },

  /**
   * Move canceled change to Undo with buffer
   * @param state
   */
  undo(state: IState) {
    try {
      const buffer = state.redoStack.pop();

      state.undoStack.push(buffer)
    }
    catch (e) {
      console.log(e)
    }
  },

  /**
   * Move repeated change to Redo with buffer
   * @param state
   */
  redo(state: IState) {
    try {
      const buffer = state.undoStack.pop();

      state.redoStack.push(buffer)
    }
    catch (e) {
      console.log(e)
    }
  },


};

export default mutations;
