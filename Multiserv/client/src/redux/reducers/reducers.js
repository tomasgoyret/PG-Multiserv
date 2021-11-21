import {
    BUSCAR,
    ORDERALPH,
    ORDERRAT,
    SERVICIOS,
    USUARIOS,
    RESETORDER,
    FILTERCAT,
    GETCATS,
    SERVICIOID,
    EMPATYSERVICIOID,
    USUARIOID,
    EMPATYUSUARIO,
    FAVORITES,
    ELIMINARFAVORITES
} from "../actionTypes/actionTypes";

/* Estado global */
const initalState = {
    loadingServices: true,
    loadingServicesDetalle: true,
    loadingProveedorDetalle: true,
    servicios: [],
    usuarios: [],
    aux: [],
    categories: [],
    detalleServicio: {},
    misFavoritos: [],
    detalleUsuario: {}
}

function rootReducer(state = initalState, { type, payload }) {
    switch (type) {
        case SERVICIOS:
            return {
                ...state,
                loadingServices: false,
                servicios: payload,
                aux: payload
            }
        case BUSCAR:
            let newServ = state.aux.filter(serv => serv.title.toLowerCase().includes(payload.toLowerCase()))
            return {
                ...state,
                servicios: newServ
            }
        case GETCATS:
            return {
                ...state,
                categories: payload
            }
        case FILTERCAT:
            let filteredCat = state.aux.filter(serv => serv.categorias[0].title?.toLowerCase() === payload.toLowerCase())
            return {
                ...state,
                servicios: filteredCat
            }
        case ORDERALPH:
            let orderedAlph = state.servicios
            if (payload === 'asc') {
                orderedAlph.sort((prev, post) => {
                    if (prev.title < post.title) return -1
                    else if (prev.title > post.title) return 1
                    else return 0
                })
            }
            else if (payload === 'desc') {
                orderedAlph.sort((prev, post) => {
                    if (prev.title.toLowerCase() < post.title.toLowerCase()) return 1
                    else if (prev.title.toLowerCase() > post.title.toLowerCase()) return -1
                    else return 0
                })
            }
            return {
                ...state,
                servicios: orderedAlph
            }
        case ORDERRAT:
            let orderedRat = state.servicios;
            if (payload === 'asc') {
                orderedRat.sort((prev, post) => prev.rating - post.rating)
            }
            else if (payload === 'desc') {
                orderedRat.sort((prev, post) => post.rating - prev.rating)
            }
            return {
                ...state,
                servicios: orderedRat
            }
        case USUARIOS:
            return {
                ...state,
                usuarios: payload
            }
        case RESETORDER:
            return {
                ...state,
                servicios: state.aux
            }
        case EMPATYUSUARIO:
            return {
                ...state,
                loadingServices: false,
                detalleUsuario: {},
            }
        case USUARIOID:
            return {
                ...state,
                loadingProveedorDetalle: false,
                detalleUsuario: payload,
            }
        case FAVORITES:
            return {
                ...state,
                misFavoritos: payload,
            }
        case ELIMINARFAVORITES:
            return {
                ...state,
                misFavoritos: payload,
            }

        case EMPATYSERVICIOID:
            return {
                ...state,
                loadingServices: false,
                detalleServicio: {},
            }
        case SERVICIOID:
            return {
                ...state,
                loadingServicesDetalle: false,
                detalleServicio: payload,
            }

        default:
            return state;
    }
}

export default rootReducer