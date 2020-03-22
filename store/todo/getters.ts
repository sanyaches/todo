import {IState} from "@/interfaces/interfaces";

const getters = {
  getNotes(state: IState) {
    return state.notes
  },

  /**
   *  Return top value of Redo || null
   */
  getTopChangeForRender(state: IState, indexNote: number) {
    try {
      return state.notes[indexNote].redoStack.top()
    }
    catch (e) {
      return null
    }
  },

  /**
   *  Return top value of Undo || null
   */
  getTopUndo(state: IState, indexNote: number) {
    try {
      return state.notes[indexNote].undoStack.top()
    }
    catch (e) {
      return null
    }
  },

  isInitRedo(state: IState, indexNote: number) {
    return state.notes[indexNote].redoStack.length === 1
  },

  isEmptyUndo(state: IState, indexNote: number) {
    try {
      return state.notes[indexNote].undoStack.isEmpty()
    }
    catch (e) {
      return null
    }
  }
};

export default getters;
