import { createPinia, defineStore } from "pinia";
//插件 pinia-plugin-persist 可以辅助实现数据持久化功能。
import piniaPluginPersist from "pinia-plugin-persist";
import { detail } from "@/api/user/index.ts";

export const useStore = defineStore({
  id: "main",
  state: () => ({
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
    async login(data?: any) {
      this.loginInfo = JSON.parse(sessionStorage.getItem("loginInfo") as any);
      this.setUserInfo(await detail({ id: this.loginInfo.id }));
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage, // 可改为 localStorage
        paths: ["userInfo"], // 指定要持久化的字段
      },
    ],
  },
});

const store = createPinia();
store.use(piniaPluginPersist);
export default store;
