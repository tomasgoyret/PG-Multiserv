/* axios parser */
import axios from 'axios';
/* action types */
import {
    SERVICIOS,
    USUARIOS
} from '../actionTypes/actionTypes';
/* Server Backend */
const server = 'http://localhost:3005';

/* Traer servicios */
export const services = () => {
    return async function (dispatch) {
        let services = `${server}/services`;
        const response = await axios(services);
        const dataServ = response.data.map(serv => serv.servicio)
        return dispatch({
            type: SERVICIOS,
            payload: dataServ
        })
    }
}
/* Traer Usuarios */
export const users = () => {
    return async function (dispatch) {
        let users = `${server}/api`;
        const response = await axios(users);
        const dataUsers = response.data.map(user => user)
        return dispatch({
            type: USUARIOS,
            payload: dataUsers
        })
    }
}