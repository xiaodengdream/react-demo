import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import memoryUtils from './utils/memoryUtils';
import storageUtils from './utils/storageUtils';
//读取local中保存user，保存在内存中(下次读取到内存user直接跳转到admin)
const user = storageUtils.getUser()
memoryUtils.user = user
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);