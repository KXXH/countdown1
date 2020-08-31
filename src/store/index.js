import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    countDownMap:new Map(),
    currentCount:0
  },
  mutations: {
    editCount:function(state,payload){
      var target=state.countDownMap[payload.index];
      Object.assign(target,payload);
    },
    removeCount:function(state,index){
      state.countDownMap.delete(index);
    },
    addCount:function(state,payload){
      payload.index=currentCount++;
      payload.createAt=new Date();
      state.countDownMap.set(payload.index,payload);
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [persistedState()]
})
