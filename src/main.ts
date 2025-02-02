import { createApp } from "vue";
import App from "./App.vue";
import { createLogto, LogtoConfig } from '@logto/vue';

import "~/styles/index.scss";
import "uno.css";

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss";

const app = createApp(App);
const config: LogtoConfig = {
    endpoint: 'https://auth.cqmu.online/',
    appId: 'zhtd5bbhd9rgobudyiimh',
};

app.use(createLogto, config);
// app.use(ElementPlus);
app.mount("#app");

const elementPlusViteStarter = createApp(App);
elementPlusViteStarter.component("AnotherApp", App);
