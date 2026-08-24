import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { vuetify } from './plugins/vuetify'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
