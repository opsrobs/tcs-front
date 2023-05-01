import { createApp } from 'vue'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css';
import Tooltip from 'primevue/tooltip';
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Button from "primevue/button"


const app = createApp(App)
app.directive('tooltip', Tooltip);
app.component('my-button', Button);
app.use(router)
app.use(PrimeVue)
app.mount('#app')

// createApp(App).use(router).mount('#app')
