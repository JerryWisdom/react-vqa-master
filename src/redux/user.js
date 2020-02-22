import { 
    REGI_SUCCESS,
    MODI_SUCCESS,
    AUTH_SUCCESS,
    LOAD_DATA,
    ERROR_MSG,
    LOGOUT 
} from "../constant/constants";

const initState={
    redirectTo:'/login',
    msg:'',
    user:'',
    pwd:'',
    nums: 0,
    rec: []
}

const vqa_user = (state=initState, action) => {
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state, msg:'', redirectTo:'/upload', ...action.payload}  //后面的为...state重新部分赋值
        case REGI_SUCCESS:
            return {...state, msg:'注册成功，请返回登录！', ...action.payload}
        case MODI_SUCCESS:
            return {...state, msg:'修改密码成功，请返回登录！', ...action.payload}
        case ERROR_MSG:
            return {...state, msg:action.msg}
        case LOGOUT:
            return {...initState, redirectTo:'/login', pwd:''}
        case LOAD_DATA:
            return {...state, msg:'', ...action.payload}
        default:
            return state
    }
}

export default vqa_user




