import {IState} from "~/store/todo/interfaces";

const getters = {
  getNotes(state: IState) {
    return state.notes
  }
};

export default getters;
