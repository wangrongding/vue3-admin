import router from "./index";
import store from "@/store";

router.beforeEach(async (to, from, next) => {
  if (to.path == "/login") {
    next();
    return;
  }
  if (store.state.token) {
    if (store.state.routes) {
      next();
    } else {
      try {
        await store.dispatch("getUserInfo");
        /* next(); */
      } catch (err) {
        await store.dispatch("resetUserInfo");
        next("/login");
      }
      //根据角色与前端定义的路由做筛选
      const accessedRoutes = await store.dispatch(
        "generateRoutesByRoles",
        store.state.userInfo.roles,
      );
      // const accessedRoutes = await store.dispatch("generateRoutes", store.state.menu);
      accessedRoutes.forEach((item) => {
        router.addRoute(item);
      });
      next({ path: to.redirectedFrom, replace: true });
    }
  } else {
    next("/login");
  }
});

router.afterEach(() => {});
