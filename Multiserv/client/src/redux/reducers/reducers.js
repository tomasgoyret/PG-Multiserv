import { 
    SERVICIOS,
    USUARIOS
} from "../actionTypes/actionTypes";

/* Estado global */
const initalState = {
    servicios: [],
    usuarios: [],
}

function rootReducer(state = initalState, {type, payload}){
    switch(type){
        case SERVICIOS:
            return{
                ...state,
                servicios: payload
            }
        case USUARIOS:
            console.log(payload)
            return{
                ...state,
                usuarios: payload
            }

        default:
            return state;
    }
}

export default rootReducer;