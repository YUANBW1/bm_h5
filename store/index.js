 import Vue from 'vue'
 import Vuex from 'vuex'
 
 Vue.use(Vuex);
 export default new Vuex.Store({
   state: {
     
     commonLoad: false
   },
   mutations: {
     
     setCommonLoad(state) {
       state.commonLoad = true;
     }
   },
   actions: {
     commonLoad(context) {
       context.commit('setCommonLoad')
     }
  
   }
 });
 
