export const ADD_CONVERSATION = "ADD_CONVERSATION"
export const REMOVE_CONVERSATION = "REMOVE_CONVERSATION"
export const ADD_MESSAGE = "ADD_MESSAGE"
export const REMOVE_MESSAGE = "REMOVE_MESSAGE"
export const ADD_CONVERSATIONS = "ADD_CONVERSATIONS"

export const addConversations = ({conversations}) => ({
    type: ADD_CONVERSATIONS,
    payload: conversations
})

export const addConversation = ({conversation}) => ({
    type: ADD_CONVERSATION,
    payload: conversation
})

export const removeConversation = ({id}) => ({
    type: REMOVE_CONVERSATION,
    payload: id
})

export const addMessages = ({messages, conversation_id}) => ({
    type: ADD_MESSAGES,
    payload: {
        messages, conversation_id
    }
})

export const addMessage = ({message, conversation_id}) => ({
    type: ADD_MESSAGE,
    payload: {
        message, conversation_id
    }
})

export const removeMessage = ({conversation_id, message_id}) => ({
    type: REMOVE_MESSAGE,
    payload: {
        conversation_id, message_id
    }
})