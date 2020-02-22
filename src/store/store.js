import { 
    createStore,
    applyMiddleware,
    compose 
} from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
// import createLogger from 'redux-logger'
import reducer from '../redux/reducers'  // 将reducer作为参数传给createStore创建store仓库
import { 
    // createHashHistory,
    createBrowserHistory
} from 'history'

// const browserHistory = createHashHistory();
const browserHistory = createBrowserHistory();

let routerWare = routerMiddleware(browserHistory);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, 
    composeEnhancers(
        applyMiddleware(
            thunk, 
            routerWare
        )
    )
);

export default store;