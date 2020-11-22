// starting redux store data
const startingState = { text: "", searches: []}

//reducer 
const reducer = (state = startingState, action) => {

    //if action is ADDSEARCH return searches array with added text
    if (action.type === "ADD_SEARCH") {
        return {
            searches: state.searches.concat(state.text),
            text: ""
        }
    }
    // if action is CHANGE_TEXT, updates state with passed in text
    if (action.type === "CHANGE_TEXT") {
        return {
            ...state,
            text: action.text
        }
    }

    return state
}

export default reducer;