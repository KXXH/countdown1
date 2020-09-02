import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import _ from "lodash";

Vue.use(Vuex)

let store=new Vuex.Store({
  state: {
    countDownMap:{},
    currentCount:0,
    timestamp:Date.now()
  },
  mutations: {
    editCount:function(state,payload){
      var target=state.countDownMap[payload.index];
      Object.assign(target,payload);
    },
    removeCount:function(state,index){
      Vue.delete(state.countDownMap,index);
    },
    addCount:function(state,payload){
      payload.index=state.currentCount++;
      payload.createAt=state.timestamp;
      payload.history=[];
      Vue.set(state.countDownMap,payload.index,payload);
    },
    resetCount:function(state,index){
      let target=_.clone(state.countDownMap[index]);
      let lastOperateDate=target.history[target.history.length-1] || target.createAt;
      let lastTimestamp=lastOperateDate;
      let dueTimestamp=target.dueDate;
      let currentTimestamp=state.timestamp;
      target.history.push(currentTimestamp);
      target.dueDate=currentTimestamp+dueTimestamp-lastTimestamp;
      Vue.set(state.countDownMap,index,target);
    },
    setTimestamp:function(state){
      state.timestamp+=1000;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths:["countDownMap","currentCount"]
  })]
})


setInterval(()=>(store.commit("setTimestamp")),1000);


export default store;