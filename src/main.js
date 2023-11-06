import { createApp } from 'vue';
import '@assets/css/main.css';
import App from './App.vue';
import router from './router';

router.beforeEach((to, from, next) => {
  // 动态设置title
  document.title = to.meta.title || 'Something Interesting';
  // 随机显示网页icon图标
  const svgModules = import.meta.glob('@assets/svg/*.svg', {
    eager: true,
    import: 'default',
  });
  const svgArr = Object.values(svgModules);
  const randomNumber = Math.floor(Math.random() * svgArr.length);
  const linkTag = document.getElementsByTagName('link')[0];
  linkTag.href = svgArr[randomNumber];

  next();
});

createApp(App).use(router).mount('#app');
