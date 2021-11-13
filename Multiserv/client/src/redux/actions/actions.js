import { 
    HELLOWORLD
} from "../actionTypes/actionTypes";


export function saludar(){
    return {
        type: HELLOWORLD,
        payload: 'Holaaaa probandooo'
    }
}

