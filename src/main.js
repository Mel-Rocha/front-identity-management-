import { createApp } from 'vue'
import App from '@/App.vue'
import { registerPlugins } from '@core/utils/plugins'
import router from '@/router'

// Styles
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'

// Create Vue app
const app = createApp(App)

// Register plugins
registerPlugins(app)

// Register router (único lugar)
app.use(router)

// Mount app
app.mount('#app')
