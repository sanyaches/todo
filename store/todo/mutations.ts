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



  setNotes(state: IState, payload: INote[]) {
    state.notes = payload
  },

  setNote(state: IState, newNote: INote) {
    state.notes[state.indexNote] = newNote
  },

  addTodo(state: IState, newTodo: ITodo) {
    state.notes[state.indexNote].todos.push(newTodo)
  },

  deleteTodo(state: IState, indexStart: number) {
    state.notes[state.indexNote].todos.splice(indexStart,1)
  },

  deleteNote(state: IState, indexStart: number) {
    state.notes.splice(indexStart, 1);
  },

  /**
   * Add change to redoStack, when newChange !== undo.top need clear undo
   * @param state
   * @param getters
   * @param newChange
   * @param payload
   */
  addChange({state, getters }: {state: IState, getters: any}, newChange: any) {
    try {
      // push new change anyway
      state.redoStack.push(newChange);

      if (getters['isEmptyUndo']) return;
      const topUndo = getters['getTopUndo'];

      // Compare topUndo & newChange
      if (topUndo !== newChange) {
        state.undoStack.clear();
      }
      else {
        // pop undo, why need repeat some change
        state.undoStack.pop();
      }
    }
    catch (e) {
      console.log(e)
    }
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
