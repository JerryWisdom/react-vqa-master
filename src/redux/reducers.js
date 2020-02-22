import { combineReducers } from 'redux' // 利用combineReducers 合并reducers
import { routerReducer } from 'react-router-redux' // 将routerReducer一起合并管理
import { persistReducer } from 'redux-persist'   //使redux和store管理的数据持久化，刷新页面数据不丢失
import storage from 'redux-persist/lib/storage'

import update from './update'
import vqa_user from './user'
import side_menu from './menu'

const combine_reducer = combineReducers({
    update,
    side_menu,
    vqa_user,
    routing: routerReducer
})

const reducer = persistReducer({
    key: 'root',
    storage
}, combine_reducer)

export default reducer