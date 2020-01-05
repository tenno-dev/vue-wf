import Vue from 'vue'
import VueMqtt from 'vue-mqtt-topics'
// Vue.use(VueMqtt, 'wss://webs.mybitti.de:8084/mqtt')
Vue.use(VueMqtt, 'ws://127.0.0.1:8083/mqtt')
