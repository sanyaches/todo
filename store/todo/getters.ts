import {IState} from "@/interfaces/interfaces";

const getters = {
  getNotes(state: IState) {
    return state.notes
  },

  getIndex(state: IState) {
    return state.indexNote
  },

  /**
   *  Return top value of Redo || null
   */
  getTopRedo(state: IState) {
    try {
      return state.redoStack.top()
    }
    catch (e) {
      return null
    }
  },

  /**
   *  Return top value of Undo || null
   */
  getTopUndo(state: IState) {
    try {
      return state.undoStack.top()
    }
    catch (e) {
      return null
    }
  },

  isInitRedo(state: IState) {
    try {
      return state.redoStack.length === 1
    }
    catch (e) {
      return null
    }

  },

  isEmptyUndo(state: IState) {
    try {
      return state.undoStack.isEmpty()
    }
    catch (e) {
      return null
    }
  }
};

export default getters;
