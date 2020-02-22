import { 
    CHANGE_MODE,
    CHANGE_THEME
} from "../constant/constants";

const initState={
    mode: 'inline',     //inline
    theme: 'light'
}

const side_menu = (state=initState, action) => {
    switch(action.type){
        case CHANGE_MODE:
            return {...state, ...action.payload } 
        case CHANGE_THEME:
            return {...state, ...action.payload }
        default:
            return state
    }
}

export default side_menu




