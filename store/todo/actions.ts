import {INote, IState} from "@/interfaces/interfaces";

const actions = {
  addNote({dispatch, commit}: {dispatch: any, commit: any}) {
    commit('addNote');
  },

  /**
   * Init redo stack with first note's state
   * @param state
   * @param commit
   * @param getters
   * @param initNote
   */
  initRedoStack({commit, getters}: { commit: any, getters: any }, initNote: INote ) {
    commit('initStacks');

    if(!getters.getTopRedo) {
      commit('push', {
        value: initNote,
        stack: 'redo'
      });
    }
  },
};

export default actions
