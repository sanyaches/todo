import {INote, IState, ITodo} from "@/interfaces/interfaces";

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

  /**
   * Add change to redoStack, when newChange !== undo.top need clear undo
   * @param state
   * @param getters
   * @param newChange
   */
  addChange({commit, getters }: {commit: any, getters: any}, newChange: any) {
    try {
      // push new change anyway - main part
      commit('push', {
        stack: 'redo',
        value: newChange
      });

      // Clearing Undo Stack if needed - second part
      if (getters['isEmptyUndo']) return;
      const topUndo = getters['getTopUndo'];

      // Compare topUndo & newChange
      if (JSON.stringify(topUndo) !== JSON.stringify(newChange)) {
        commit('clear', 'undo');
      }
      else {
        // pop undo, why need repeat some change
        commit('pop', 'undo');
      }
    }
    catch (e) {
      console.log(e)
    }
  },

  checkTodo({dispatch, state, getters}: {state: IState, dispatch: any, getters: any}) {
    // 1) create copy top redo
    const copy: INote = JSON.parse(JSON.stringify(getters.getTopRedo));

    // 2) change copy
    copy.todos[state.indexTodo].checked = !copy.todos[state.indexTodo].checked;

    // 3) push copy to redo
    dispatch('addChange', copy)
  },

  changeTitle({dispatch, state, getters}: {state: IState, dispatch: any, getters: any}, value: any) {
    // 1) create copy top redo
    const copy: INote = JSON.parse(JSON.stringify(getters.getTopRedo));

    // 2) change copy
    copy.title = value;

    // 3) push copy to redo
    dispatch('addChange', copy)
  },

  changeLabelTodo({dispatch, state, getters}: {state: IState, dispatch: any, getters: any}, value: any) {
    // 1) create copy top redo
    const copy: INote = JSON.parse(JSON.stringify(getters.getTopRedo));

    // 2) change copy
    copy.todos[state.indexTodo].label = value;

    // 3) push copy to redo
    dispatch('addChange', copy)
  },

  addTodo({dispatch, state, getters}: {state: IState, dispatch: any, getters: any}, newTodo: ITodo) {
    // 1) create copy top redo
    const copy: INote = JSON.parse(JSON.stringify(getters.getTopRedo));

    // 2) change copy
    copy.todos.push(newTodo);

    // 3) push copy to redo
    dispatch('addChange', copy)
  },

  deleteTodo({dispatch, state, getters}: {state: IState, dispatch: any, getters: any}, indexStart: number) {
    // 1) create copy top redo
    const copy: INote = JSON.parse(JSON.stringify(getters.getTopRedo));

    // 2) change copy
    copy.todos.splice(indexStart,1);

    // 3) push copy to redo
    dispatch('addChange', copy)
  },
};

export default actions
