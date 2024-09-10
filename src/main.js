import '@mdi/font/css/materialdesignicons.css' 
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import { VDateInput } from 'vuetify/labs/VDateInput'


const app = createApp(App)

const vuetify = createVuetify({
  components: {
    ...components,
    VTimePicker,   
    VDateInput,
  },
  directives,
  icons:{
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  }
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
