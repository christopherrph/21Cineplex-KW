const INITIAL_STATE = {
    username: '',
    email: '',
    role: '',
    id: ''
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'LOGIN':
            return{
                ...state, 
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role,
                id: action.payload.id
            }
        case 'LOGOUT':
            return INITIAL_STATE
        default:
            return state
    }
}
