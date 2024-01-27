import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import { vGlitched } from "./directives/vGlitched";
import router from "./router";

createApp(App)
  .use(createPinia())
  .use(router)
  .directive("glitched", vGlitched)
  .mount("#app");
