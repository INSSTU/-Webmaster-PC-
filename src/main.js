import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/less/index.less'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from "pinia";
import "@/api/mock.js"
import api from "@/api/api"
import { useAllDataStore } from "@/stores"

function isRoute(to) {
  let res = router.getRoutes();
  let resFil = res.filter((item) => item.path === to.path)
  return resFil.length > 0
}
router.beforeEach((to) => {
  if(to.path !== "/login" && !store.state.token) {
    return { name: 'login' }
  }
  if (!isRoute(to)) {
    return { name: '404' }
  }
})

const pinia = createPinia();
const app = createApp(App)

app.config.globalProperties.$api = api;
app.use(ElementPlus);
app.use(pinia);
// 这里store的使用需要在app.use(pinia)之后使用
const store = useAllDataStore()
store.addMenu(router, "refresh")

app.use(router)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
