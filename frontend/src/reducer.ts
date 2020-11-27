import { ApplicationState } from "./types"

const initialState: ApplicationState = {
    contacts: []
};

export function theReducer(state: ApplicationState = initialState, action: any) {
    console.log({ state, action })
    switch (action.type) {
      case "initial":
          return { ...state, contacts: action.data };
      case "update_contact":
        return { ...state, contacts: action.data };
      default:
        return state
    }
  }