import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './Router/index.js'
import PrimeVue from 'primevue/config'
import Dialog from "primevue/dialog";



const app = createApp(App)
app.use(router)
app.use(PrimeVue)


app.component("Dialog",Dialog)



app.mount('#app')
