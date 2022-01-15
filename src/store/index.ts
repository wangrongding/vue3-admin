import { createPinia, defineStore } from "pinia";
import { detail } from "@/api/user/index.ts";

export const useStore = defineStore({
  id: "main",
  state: () => ({
    name: "",
    userInfo: {} as any,
    loginInfo: {} as any,
  }),
  getters: {
    getUserInfo: (state) => state.userInfo,
  },
  actions: {
    setUserInfo(info: any) {
      this.userInfo = info;
    },
    // 可以做异步
    async login(data?: any) {
      this.loginInfo = JSON.parse(sessionStorage.getItem("loginInfo") as any);
      // await detail({ usrid: this.loginInfo.id });
    },
  },
});

export default createPinia();
