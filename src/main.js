import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'

// Styles do Sneat
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'

// Cria app
const app = createApp(App)

// Registra apenas o router
app.use(router)

// Plugins do Sneat
import { registerPlugins } from '@core/utils/plugins'
registerPlugins(app)

app.mount('#app')
