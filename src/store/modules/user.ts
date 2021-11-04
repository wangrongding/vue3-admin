// import REQUEST_DATA from "@/api/requestHandler";
const state = {
    userInfo: { userName: "admin" },
};
const mutations = {
    // setStateItem(state: any, data: any) {
    //     state[data.key] = data.value;
    // },
};

const actions = {
    /* async getUserData({ commit }: any, data?: any): Promise<any> {
    try {
      const res = await REQUEST_DATA("userInfoUri", data);
      commit("setStateItem", {
        key: "reasonList",
        value: res.data.data,
      });
      data.cb && data.cb(res.data.data.satisfaction_status);
    } catch (e) {
      return false;
    }
  }, */
};

export default {
    state,
    actions,
    mutations,
    namespaced: true,
};
