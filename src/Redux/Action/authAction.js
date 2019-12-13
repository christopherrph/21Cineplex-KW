import Axios from "axios"

export const signin = (username, password) =>{   // Action Creator
    return(dispatch) =>{        // Action Reducer
        Axios.get(`http://localhost:2000/login?username=${username}&password=${password}`)
        .then((res) => {

            dispatch({
            type: 'LOGIN',
            payload: res.data[0]
            })

            dispatch({
                type: 'CONTOH',
            })

        })
        .catch((err) =>{
            dispatch({
            type: 'LOGOUT',
            })
        })
    }
}

export const logout = () =>{
    return(dispatch) =>{
        
        dispatch({
            type: 'LOGOUT'
        })

        dispatch({
            type: 'CONTOHOUT'
        })

    }
}