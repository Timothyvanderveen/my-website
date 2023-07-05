import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { vGlitched } from "./directives/vGlitched";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
// app.use(router);
app.directive("glitched", vGlitched);
app.mount("#app");
