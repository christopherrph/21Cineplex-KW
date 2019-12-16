const INITIAL_STATE = {
    text: ''
}

export const contohReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'CONTOH':
            return{
                ...state, 
                text: '-----'
            }
        case 'CONTOHOUT':
            return{
                ...state, 
                text: '.....'
            }
        default:
            return state
    }
}