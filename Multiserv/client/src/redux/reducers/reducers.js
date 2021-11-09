import { 
    HELLOWORLD
} from "../actionTypes/actionTypes";

const initalState = {
    text: ''
}

function rootReducer(state = initalState, action){
    switch(action.type){
        case HELLOWORLD:
            return{
                ...state,
                text: action.payload
            }

        default:
            return state;
    }
}

export default rootReducer;
