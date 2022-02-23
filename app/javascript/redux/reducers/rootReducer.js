import {userReducer} from "./userReducer";
import {combineReducers} from "redux";
import {conversationReducer} from "./conversationReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    conversations: conversationReducer
})