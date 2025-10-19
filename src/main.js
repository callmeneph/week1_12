import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// PrimeVue
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

// Components used across pages
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const app = createApp(App)
app.use(router)
app.use(PrimeVue, { theme: { preset: Aura } })

// Register global PrimeVue components
app.component('DataTable', DataTable)
app.component('Column', Column)

app.mount('#app')
