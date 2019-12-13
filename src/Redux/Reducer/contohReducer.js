const INITIAL_STATE = {
    text: ''
}

export const contohReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'CONTOH':
            return{
                ...state, 
                text: 'Berhasil!'
            }
        case 'CONTOHOUT':
            return{
                ...state, 
                text: 'Sudah Logout!'
            }
        default:
            return state
    }
}