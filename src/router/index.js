import { createRouter, createWebHistory } from 'vue-router';

// 自动生成routes
const pageModules = import.meta.glob('../views/**/page.js', {
  eager: true,
  import: 'default',
});
const compModules = import.meta.glob('../views/**/index.vue');
const routes = Object.entries(pageModules).map(([pagePath, config]) => {
  let path = pagePath.replace('../views', '').replace('/page.js', '');
  path = path == '/home' ? '/' : path; //规定/home为首页
  const name = path.split('/').filter(Boolean).join('-');
  const compPath = pagePath.replace('page.js', 'index.vue');
  return {
    path: path,
    name: name,
    component: compModules[compPath],
    meta: config,
  };
});

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
