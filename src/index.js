import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import RouterConfig from './Router/RouterConfig'
import 'antd/dist/antd.css';
import { Provider } from "react-redux";
import store from './store/store'
import './assets/scss/index.scss'

import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
const persistor = persistStore(store)

ReactDOM.render( 
    <Provider store={store}>
        <PersistGate 
            loading={null} 
            persistor={persistor}
        >
            <RouterConfig />
        </PersistGate>
    </Provider>, 
    document.getElementById('root')
);

serviceWorker.unregister();

// If you want your app to work offline and load faster, you can change unregister() to register() below. 
// Note this comes with some pitfalls. Learn more about service workers: https://bit.ly/CRA-PWA

// 在项目目录下，运行npm run build，进行打包，打包完成后会在目录下生成一个build文件夹，build生成的这些东西要放在服务器root下
// 部署的时候你可以把build里的文件直接放到服务器的根路径下，比如，你的服务器IP是47.96.134.256，应用服务器端口为8080，
// 这样就保证http://47.96.134.256:8080这种访问方式，访问到的是你的build下的文件。
// 如果你希望以http://47.96.134.256:8080/build/index.htm这种方式访问应用
// 那么你可以在package.json文件中增加一个homepage字段："homepage": "." 或 "/"

