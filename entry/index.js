import Vue from 'vue/dist/vue.js'
import KeenUI from 'keen-ui';
import 'keen-ui/src/bootstrap';
//import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-default/index.css'
//import 'keen-ui/keen-ui.min.css'
import VueLazyload from 'vue-lazyload'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
// import routes from './router'
Vue.use(KeenUI);
Vue.use(VueRouter)
Vue.use(vueResource)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/404.png',
  loading: 'dist/loading-spin.svg',
  attempt: 1
})

//import routes from './routes'
import index from '../views/index.vue';
/*const routes=[
		{
			path:"/",
			component:index
		}
	];
const router = new VueRouter({
  routes
});*/

//Vue.component('nv-head', require('../components/head.vue'));
new Vue({
	components:{
		tabs:index,
	}
}).$mount('#app');

window.jumpArtistDetail = function(id,event){
	location.href = 'artistDetail.html?id='+id+'&imgid='+encodeURIComponent(event.currentTarget.querySelector('.specialImgBox img').src.match(/starheads[\/0-9]+/)[0]);
}