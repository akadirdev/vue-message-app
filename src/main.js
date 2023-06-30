import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { serverUrl } from './config';

import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';

import { io } from 'socket.io-client';

createApp(App).use(router).use(Antd).mount('#app');

export const socket = io(serverUrl);

socket.on('connect', () => {
  console.log('socket connected', socket.id);
});

socket.on('disconnect', () => {
  console.log('socket disconnected');
});

socket.io.on('reconnect_attempt', () => {
  console.log('socket reconnect_attempt');
});

socket.io.on('reconnect', () => {
  console.log('socket reconnected');
});
