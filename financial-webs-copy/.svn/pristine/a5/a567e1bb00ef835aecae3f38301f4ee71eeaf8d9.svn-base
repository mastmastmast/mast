import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: window.localStorage.getItem('username')
  },
  getters: {
    username: state => state.username
  },
  mutations: {
    SET_USER_NAME: (state,username)=>{
      state.username = username;
      window.localStorage.setItem('username',username)
    }
  },
  actions: {
    changeUserName: ({commit},username)=>{
      commit('SET_USER_NAME',username)
    }
  }
});
