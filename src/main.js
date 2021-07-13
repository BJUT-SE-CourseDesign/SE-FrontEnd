import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import store from './store/index';
import contextmenu from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";

const app = createApp(App);
app.use(ElementPlus);
app.use(store);
app.use(contextmenu);
app.mount("#app");

