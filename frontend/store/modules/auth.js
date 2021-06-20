import Vue from 'vue'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  FETCH_USER_BY_ID,
  REGISTER_USER_REQUEST,
  SUCCESS,
  ERROR_MESSAGE,
  SET_ERR0R_NULL,
  LOGOUT,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  ACTIVATE_ACCOUNT,
  REFRESH_USER_BY_ID,
  TOP_UP_ACCOUNT,
  SEND_MONEY,
  TOKEN,


} from "../actions/auth";
import {
  login,
  register,
  fetchUserById,
  topUp,
  sendMoney
} from "../../services/apiSrv";

const state = {
  loading: false,
  user: null,
  token: null,
  error: null,
  success_response:null,
  loadingTopUp:false,
  loadingSendMoney:false
};

const getters = {
  isLoading: state => state.loading,
  isError: state => state.error,
  id: state => state.id,
  isUser: state => !!state.user,
  isRegistered:state=>state.success_response,
  isLoadingTopUp:state=>state.loadingTopUp,
  isLoadingSendMoney:state=>state.loadingSendMoney

};

const mutations = {
  // Login Mutations
  [LOGIN_REQUEST]: state => {
    state.loading = true;
  },
  [LOGIN_SUCCESS]: (state, resp) => {
    state.token = resp.token;
    state.loading = false;
  },
  [LOGIN_ERROR]: state => {
    state.hasLoadedOnce = true;
    state.loading = false;
  },

  [FETCH_USER_BY_ID]: state => {
    state.loading = true;
  },

  [TOP_UP_ACCOUNT]: state => {
    state.loadingTopUp = true;
  },
  [SEND_MONEY]: state => {
    state.loadingSendMoney = true;
  },

  [FORGOT_PASSWORD]: state => {
    state.loading = true;
  },

  [RESET_PASSWORD]: state => {
    state.loading = true;
  },

  [FETCH_USER_BY_ID]: (state, resp) => {
    state.user = resp;
    state.loading = false;
  },

  [TOP_UP_ACCOUNT]: (state, resp) => {
    state.loadingTopUp = false;
  },
  [SEND_MONEY]: (state, resp) => {
    state.loadingSendMoney = false;
  },

  [REFRESH_USER_BY_ID]: (state, resp) => {
    state.user = resp;
    state.loading = false;
  },

  [TOKEN]: (state, token) => {
    state.token = token;
  },
  [SUCCESS]: (state,resp) => {
    state.hasLoadedOnce = true;
    state.loading = false;
    state.success_response=resp
  },

  [LOGOUT]: state => {
    state.token=null;
    state.user=null
    state.users=null
  },

  [ERROR_MESSAGE]: (state, error) => {
    state.error = error;
    state.loading = false;
  },
  [REGISTER_USER_REQUEST]: state => {
    state.loading = true;
  },
  [SET_ERR0R_NULL]: state => {
    state.error = null;
  },
  [ACTIVATE_ACCOUNT]: state => {
    state.loading = true;
  },



};

const actions = {
  [SET_ERR0R_NULL]: ({ commit }) => {
    commit(SET_ERR0R_NULL);
  },


  [LOGOUT]: ({ commit }) => {
    $nuxt.$router.push({ path: "/" });
    commit(LOGOUT);
  },

  [LOGIN_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(LOGIN_REQUEST);
      login(user)
        .then(resp => {
          commit(LOGIN_SUCCESS, resp.data);
          $nuxt.$router.push({ path: "/homepage" });
          dispatch(FETCH_USER_BY_ID, resp.data.token);
          commit(TOKEN, resp.data.token);
          resolve(resp);
        })
        .catch(async err => {
          let error = await err;
          commit(LOGIN_ERROR, error);
          reject(error);
        });
    });
  },



  [FETCH_USER_BY_ID]: ({ commit }, form) => {
    return new Promise((resolve, reject) => {
      commit(FETCH_USER_BY_ID);
      fetchUserById(form)
        .then(resp => {
          commit(SUCCESS);
          commit(FETCH_USER_BY_ID, resp);
          resolve(resp);
        })
        .catch(async err => {
          let error = await err;
          commit(ERROR_MESSAGE, error);
          reject(error);
        });
    });
  },

  [REGISTER_USER_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(REGISTER_USER_REQUEST);
      register(user)
        .then(resp => {
          commit(SUCCESS,resp);
          $nuxt.$router.push({ path: "/sign-in" });
          resolve(resp);
        })
        .catch(async err => {
          commit(ERROR_MESSAGE, error);
          let error = await err;
          reject(error);
        });
    });
  },

  [TOP_UP_ACCOUNT]: ({ commit, dispatch }, form) => {
    return new Promise((resolve, reject) => {
      commit(TOP_UP_ACCOUNT);
      topUp(form)
        .then(resp => {
          commit(TOP_UP_ACCOUNT,resp);
          dispatch(FETCH_USER_BY_ID,form.token);
          Vue.notify({
            group: "auth",
            type: "success",
            title: "Error!",
            text: `Account credited successfully`
          });
          resolve(resp);
        })
        .catch(async err => {
          commit(TOP_UP_ACCOUNT,err);
          commit(ERROR_MESSAGE, error);
          let error = await err;
          reject(error);
        });
    });
  },
  [SEND_MONEY]: ({ commit, dispatch }, form) => {
    return new Promise((resolve, reject) => {
      commit(SEND_MONEY);
      sendMoney(form)
        .then(resp => {
          commit(SEND_MONEY,resp);
          dispatch(FETCH_USER_BY_ID,form.token);
          console.log(resp)
          if(resp.status=== "invalid"){
            Vue.notify({
              group: "auth",
              type: "error",
              title: "Error!",
              text: resp.message
            });
          }else
          Vue.notify({
            group: "auth",
            type: "success",
            title: "Error!",
            text: `Account debited successfully`
          });
          resolve(resp);
        })
        .catch(async err => {
          commit(SEND_MONEY,err);
          commit(ERROR_MESSAGE, error);
          let error = await err;
          reject(error);
        });
    });
  },



  [FORGOT_PASSWORD]: ({ commit, dispatch }, email) => {
    return new Promise((resolve, reject) => {
      commit(FORGOT_PASSWORD);
      forgotPassword(email)
        .then(resp => {
          commit(SUCCESS);
           Vue.notify({
      group: "auth",
      type: "success",
      title: "Success!",
      text: `${resp.data.message}`
    });
          resolve(resp);
        })
        .catch(async err => {
          let error = await err;
          commit(ERROR_MESSAGE);
          reject(error);
        });
    });
  },

  [RESET_PASSWORD]: ({ commit, dispatch }, form) => {
    return new Promise((resolve, reject) => {
      commit(RESET_PASSWORD);
      resetPassword(form)
        .then(resp => {
          commit(SUCCESS);

                 Vue.notify({
      group: "auth",
      type: "success",
      title: "Success!",
      text: `${resp.data.message}`
    });
    $nuxt.$router.push({ path: "/login" });
          resolve(resp);
        })
        .catch(async err => {
          let error = await err;
          commit(ERROR_MESSAGE);
          reject(error);
        });
    });
  },



};


export default {
  state,
  getters,
  actions,
  mutations
};
