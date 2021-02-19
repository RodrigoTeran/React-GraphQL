export const messagesInitialState = [];

export function messagesReducer(state, action) {
  if (action.type === "addEverything") {
    const { messages } = action.payload;
    return messages;
  }
  if (action.type === "addOne") {
    const { message } = action.payload;
    return [...state, message];
  }
  return state;
}
