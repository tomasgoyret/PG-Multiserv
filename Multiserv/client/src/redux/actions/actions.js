/* axios parser */
import axios from 'axios';
/* action types */
import {
    BUSCAR,
    ORDERALPH,
    ORDERRAT,
    SERVICIOS,
    USUARIOS,
    RESETORDER,
    FILTERCAT,
    GETCATS,
} from '../actionTypes/actionTypes';
/* Server Backend */
const server = '';

/* Traer servicios */
export const services = () => {
    return async function (dispatch) {
        let services = `${server}/services`;
        const response = await axios(services);
        const dataServ = response.data
        console.log(dataServ)
        return dispatch({
            type: SERVICIOS,
            payload: dataServ
        })
    }
}
/* Traer Usuarios */
export const users = () => {
    return async function (dispatch) {
        let users = `${server}/usuarios`;
        const response = await axios(users);
        const dataUsers = response.data.map(user => user)
        return dispatch({
            type: USUARIOS,
            payload: dataUsers
        })
    }
}
/* Obtener las categorias  */
export const getCats = () => {
    return async function (dispatch) {
        let categories = `${server}/categorias`;
        const response = await axios(categories);
        const dataCats = response.data.map(cat => {
            return { id: cat.id, name: cat.title, value: cat.title }
        })
        return dispatch({
            type: GETCATS,
            payload: dataCats
        })
    }
}
/* Filtrado por categoria */
export const filterCats = (nombre) => { return { type: FILTERCAT, payload: nombre } }
/* Buscar Servicio */
export const buscar = (nombre) => { return { type: BUSCAR, payload: nombre } }
/* Ordenar Servicios */
/* Por alfabeto */
export const orderAlph = (by) => {
    console.log(by)
    return { type: ORDERALPH, payload: by }
}
/* Por rating */
export const orderRating = (by) => { return { type: ORDERRAT, payload: by } }

export const resetOrder = (action) => { return { type: RESETORDER } }
