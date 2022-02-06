export const ADD_USER = "ADD_USER"
export const REMOVE_USER = "REMOVE_USER"

export const addUser = ({name, surname, username, email}) => ({
    type: ADD_USER,
    payload: {
        name,
        surname,
        username,
        email
    }
})

export const removeUser = () => ({
    type: REMOVE_USER,
    payload: {}
})
