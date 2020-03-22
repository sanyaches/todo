import {IState, INote, ITodo, Stack} from "@/interfaces/interfaces";

const mutations = {
  addNote(state: IState) {
    const newNote: INote = {
      title: "New todo list",
      todos: [{
        checked: false,
        label: 'New todo'
      }],
      undoStack: new Stack(),
      redoStack: new Stack(),
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
    state.notes.splice(indexStart, 1);
  },

  /**
   * Init redo stack with first note's state
   * @param state
   * @param payload - note and index
   */
  initRedoStack(state: IState, payload: { initNote: INote, indexNote: number }) {
    if(state.notes[payload.indexNote].redoStack.isEmpty()) {
      state.notes[payload.indexNote].redoStack.push(payload.initNote);
    }
  },

  /**
   * Add change to redoStack, when newChange !== undo.top need clear undo
   * @param state
   * @param getters
   * @param payload
   */
  addChange({state, getters }: {state: IState, getters: any}, payload: {
    newChange: any,
    indexNote: number
  }) {
    try {
      // push new change anyway
      state.notes[payload.indexNote].redoStack.push(payload.newChange);

      if (getters['isEmptyUndo']) return;
      const topUndo = getters['getTopUndo'];

      // Compare topUndo & newChange
      if (topUndo !== payload.newChange) {
        state.notes[payload.indexNote].undoStack.clear();
      }
      else {
        // pop undo, why need repeat some change
        state.notes[payload.indexNote].undoStack.pop();
      }
    }
    catch (e) {
      console.log(e)
    }
  },

  /**
   * Move canceled change to Undo with buffer
   * @param state
   * @param indexNote
   */
  cancelChange(state: IState, indexNote: number) {
    try {
      const buffer = state.notes[indexNote].redoStack.pop();

      state.notes[indexNote].undoStack.push(buffer)
    }
    catch (e) {
      console.log(e)
    }
  },

  /**
   * Move repeated change to Redo with buffer
   * @param state
   * @param indexNote
   */
  repeatChange(state: IState, indexNote: number) {
    try {
      const buffer = state.notes[indexNote].undoStack.pop();

      state.notes[indexNote].redoStack.push(buffer)
    }
    catch (e) {
      console.log(e)
    }
  },


};

export default mutations;
