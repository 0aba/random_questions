import router from "./router/index.ts"
import { createPinia } from "pinia"
import "./assets/styles/main.css"
import { createApp } from "vue";
import App from "./App.vue";


createApp(App)
    .use(router)
    .use(createPinia())
    .mount("#app");
