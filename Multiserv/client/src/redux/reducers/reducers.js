import { 
    BUSCAR,
    ORDERALPH,
    ORDERRAT,
    SERVICIOS,
    USUARIOS
} from "../actionTypes/actionTypes";

/* Estado global */
const initalState = {
    servicios: [],
    usuarios: [],
    aux: []
}

function rootReducer(state = initalState, {type, payload}){
    switch(type){
        case SERVICIOS:
            return{
                ...state,
                servicios: payload,
                aux: payload
            }
        case BUSCAR:
            let newServ = state.aux.filter(serv => serv.title.toLowerCase().includes(payload.toLowerCase()))
            return{
                ...state,
                servicios: newServ
            }
        case USUARIOS:
            console.log(payload)
            return{
                ...state,
                usuarios: payload
            }
        case ORDERALPH:
            return{
                ...state,
                servicios: payload
            }
        case ORDERRAT:
            return{
                ...state,
                servicios: payload
            }
        default:
            return state;
    }
}

export default rootReducer