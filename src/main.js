import { createApp } from 'vue'
import { defineComponent } from "vue";

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css';
import Tooltip from 'primevue/tooltip';
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Button from "primevue/button";
import Loading from 'vue-loading-overlay';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

import { useToast } from "primevue/usetoast";


const app = createApp(App)
app.directive('tooltip', Tooltip);
app.component('my-button', Button);
app.component('loading-overlay', Loading);
app.use(ToastService)
app.use(ConfirmationService);
app.use(router)
app.use(PrimeVue)
app.component('my-Toast', Toast);

app.mount('#app')

export default defineComponent({
    setup() {
        const toast = useToast();
        toast.add({severity:'info', summary: 'Info Message', detail:'Message Content', life: 3000});
        
    }
})

// createApp(App).use(router).mount('#app')
