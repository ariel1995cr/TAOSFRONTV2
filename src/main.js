import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router/index";
import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";
import Ripple from "primevue/ripple";
import CodeHighlight from "./AppCodeHIghlight";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "prismjs/themes/prism-coy.css";
import "@fullcalendar/core/main.min.css";
import "@fullcalendar/daygrid/main.min.css";
import "@fullcalendar/timegrid/main.min.css";
import "./assets/layout/layout.scss";
import "./assets/layout/flags/flags.css";
import vueDebounce from "vue-debounce";

const app = createApp(App);

app.config.globalProperties.$appState = reactive({ inputStyle: "outlined" });
app.config.globalProperties.$primevue = reactive({ ripple: true });

app.directive("tooltip", Tooltip);
app.directive("ripple", Ripple);
app.directive("code", CodeHighlight);
app.use(vueDebounce);
app
  .use(router)
  .use(ToastService)
  .mount("#app");
