import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'

// PrimeVue v4
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'   // <— using @primeuix/themes

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })

// Register components globally (so you can use <DataTable> and <Column> anywhere)
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
app.component('DataTable', DataTable)
app.component('Column', Column)

app.mount('#app')
