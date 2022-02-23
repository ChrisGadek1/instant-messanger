import {
    ADD_CONVERSATION,
    ADD_MESSAGE,
    REMOVE_CONVERSATION,
    REMOVE_MESSAGE
} from "../actions/conversationsActions";


export const conversationReducer = (state = [], action) => {
    switch (action.type){
        case ADD_CONVERSATION:
            return [...state, action.payload]
        case REMOVE_CONVERSATION:
            return [...state.filter(conversation => conversation.id !== action.payload)]
        case ADD_MESSAGE:
            let newState = state
            newState.find(conversation => conversation.id === action.payload.conversation_id).messages.push(action.payload.message)
            return [...newState]
        case REMOVE_MESSAGE:
            let newState2 = state
            newState.find(conversation => conversation.id === action.payload.conversation_id).messages.filter(message => message.id !== action.payload.message_id)
            return [...newState2]
        default:
            return state
    }
}