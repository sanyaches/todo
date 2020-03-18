import {IState} from "@/interfaces/interfaces";

const actions = {
  loadNotes({state, commit}: {state: IState, commit: any}) {
    commit('setNotes', JSON.parse(<string>localStorage.getItem('notes')))
  },

  addNote({dispatch, commit}: {dispatch: any, commit: any}) {
    commit('addNote');
    dispatch('saveNotes')
  },

  saveNotes({ state }: { state: IState }) {
    localStorage.setItem("notes",JSON.stringify(state.notes))
  }
};

export default actions
