import { INPUT_QUES,CLEAR_INPUT_QUES,SET_IMAGE_URL,SET_ANSWER,REGI_SUCCESS,AUTH_SUCCESS,MODI_SUCCESS,LOAD_DATA,ERROR_MSG,LOGOUT,CHANGE_MODE,CHANGE_THEME } from "../constant/constants";
import axios from "axios";

// 这些方法都返回一个action对象
export const handleGetInputValue = ques =>({
    type: INPUT_QUES,
    ques
})

export const handleSetImageUrl = imgurl =>({
    type: SET_IMAGE_URL,
    imgurl
})

export const handleSetAnswer = ans =>({
    type: SET_ANSWER,
    ans
})

export const handleClearInques = () => ({
    type: CLEAR_INPUT_QUES
})

export const handleSetMode = data =>({
    type: CHANGE_MODE,
    payload: data
})

export const handleSetTheme = data =>({
    type: CHANGE_THEME,
    payload: data
})

// 注册登录模块，访问与Flask后端连接的MySQL数据库
function authSuccess(obj){
    const {...data} = obj
    return {
        type: AUTH_SUCCESS,
        payload: data
    }
}
function regiSuccess(obj){
    const {pwd,...data} = obj
    return {
        type: REGI_SUCCESS,
        payload: data
    }
}
function modiSuccess(obj){
    const {pwd,...data} = obj
    return {
        type: MODI_SUCCESS,
        payload: data
    }
}
function errorMsg(msg){
    return {
        msg,
        type: ERROR_MSG
    }
}

export function loadData(obj){
    const { ...data } = obj
    console.log(data)
	return { 
        type: LOAD_DATA, 
        payload: data
    }
}

export function logoutSubmit(){
	return { 
        type: LOGOUT 
    }
}

//判断字符串密码是否为数字和字母的组合
function checkPwd (str){
    var zg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/;
    if (!zg.test(str)) {
        return false;
    } else {
        return true;
    }
}

// 注册
export function register({user,pwd,repeatpwd}){
    if(!user||!pwd){
        return errorMsg('用户名密码必须输入!')
    }
    if(pwd!==repeatpwd){
        return errorMsg('密码不一致!')
    }
    if(!checkPwd(pwd)){
        return errorMsg("密码必须只包含字母和数字！")
    }
    if(pwd.length<6){
        return errorMsg("密码不能少于六位数！")
    }
    return async dispatch=>{
        // let form_data = new FormData();   // 创建form对象
        // form_data.append('username', user);
        // form_data.append('password', pwd);
        // console.log(form_data)
        await axios.get(`/usr_register?username=${user}&password=${pwd}`
            // {
            // headers: {
            //     'Access-Control-Allow-Origin':'*',  //解决cors头问题, 不同端口存在跨域问题，使用proxy代理
            //     'Access-Control-Allow-Credentials':'true', //解决session问题
            //     'Content-Type': 'application/form-data; charset=UTF-8'
            // },
            // withCredentials : true}
        ).then(res=>{
            if(res.data['auth']){  //res.status===200&&res.data.code===0
                dispatch(regiSuccess({user,pwd}))
            }else{
                dispatch(errorMsg(res.data['msg']))
            }
        }).catch( error => { 
            dispatch(errorMsg('服务器未响应!'))
        });
    }   
}

// 登录
export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg('用户名密码必须输入!')
    }
    return async dispatch=>{
        await axios.get(`/usr_login?username=${user}&password=${pwd}`
        ).then(res=>{
            if(res.data['auth']){
                dispatch(authSuccess({user,pwd}))
            }else{
                dispatch(errorMsg(res.data['msg']))
            }
        }).catch( error => {
            dispatch(errorMsg('服务器未响应!'))
        });
    }
}

// 忘记密码？用户修改密码
export function modify({user,pwd,repeatpwd}){
    if(!user||!pwd){
        return errorMsg('用户名密码必须输入!')
    }
    if(pwd!==repeatpwd){
        return errorMsg('密码不一致!')
    }
    if(!checkPwd(pwd)){
        return errorMsg("密码必须只包含字母和数字！")
    }
    if(pwd.length<6){
        return errorMsg("密码不能少于六位数！")
    }
    return async dispatch=>{
        await axios.get(`/usr_modify?username=${user}&password=${pwd}`
        ).then(res=>{
            if(res.data['auth']){  
                dispatch(modiSuccess({user,pwd}))
            }else{
                dispatch(errorMsg(res.data['msg']))
            }
        }).catch( error => { 
            dispatch(errorMsg('服务器未响应!'))
        });
    }   
}

// 查询某用户使用记录
export function search_by_user({user}){
    return async dispatch=>{
        await axios.get(`/usr_record?username=${user}`
            ).then(res=>{
            if(res.data['auth']){
                let nums = res.data['nums']
                let rec = res.data['rec']
                dispatch(loadData({nums,rec}))
            }
            else{
                dispatch(errorMsg(res.data['msg']))
            }
        }).catch( () => { 
            dispatch(errorMsg('服务器响应出错 !'))
        });
    }
}
