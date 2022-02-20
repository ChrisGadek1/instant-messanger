import {ADD_USER, REMOVE_USER} from "../actions/userActions";

export const userReducer = (state = null, action) => {
    switch (action.type){
        case ADD_USER:
            return {
                name: action.payload.name,
                surname: action.payload.surname,
                username: action.payload.username,
                email: action.payload.email,
                avatar: action.payload.avatar
            }
        case REMOVE_USER:
            return {}
        default:
            return state
    }
}