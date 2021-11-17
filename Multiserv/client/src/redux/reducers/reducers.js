import { 
    BUSCAR,
    ORDERALPH,
    ORDERRAT,
    SERVICIOS,
    USUARIOS,
    RESETORDER,
    FILTERCAT
} from "../actionTypes/actionTypes";

/* Estado global */
const initalState = {
    loadingServices: true,
    servicios: [],
    usuarios: [],
    aux: []
}

function rootReducer(state = initalState, {type, payload}){
    switch(type){
        case SERVICIOS:
            return{
                ...state,
                loadingServices: false,
                servicios: payload,
                aux: payload
            }
        case BUSCAR:
            let newServ = state.aux.filter(serv => serv.title.toLowerCase().includes(payload.toLowerCase()))
            return{
                ...state,
                servicios: newServ
            }
        case FILTERCAT:
            return{
                ...state,
                servicios: payload
            }
        case USUARIOS:
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
        case RESETORDER:
            return{
                ...state,
                servicios: state.aux
            }
        default:
            return state;
    }
}

export default rootReducer