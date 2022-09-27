import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import mrssagePl from '@/utils/message.plugin'
import 'materialize-css/dist/js/materialize.min.js'
const app = createApp(App);
app.use(store);
app.use(router);
app.use(mrssagePl);
app.mount('#app');
