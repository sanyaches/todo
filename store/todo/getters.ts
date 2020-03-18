import {IState} from "@/interfaces/interfaces";

const getters = {
  getNotes(state: IState) {
    return state.notes
  }
};

export default getters;
