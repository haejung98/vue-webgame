import Vue from 'vue'; // vue.js
import {createApp} from 'vue';
import NumberBaseball from './Numberbaseball'; // Numberbasball.vue.js
createApp(NumberBaseball).mount('#root');

//new Vue(NumberBaseball).$mount('#root'); // el: '#root' 역할, vue 인스턴스