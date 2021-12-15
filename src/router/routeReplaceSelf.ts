// export default function routeReplaceSelf(component) {
//   return {
//     name: 'routeReplaceSelf',
//     computed: {
//       showChild() {
//         const deepestMatchedRoute = this.$route.matched[this.$route.matched.length - 1];
//         return deepestMatchedRoute.instances.default !== this;
//       },
//     },
//     render(h) {
//       const child = this.showChild ? h('router-view') : h(component);

//       return h('keep-alive', [child]);
//     },
//   };
// }

// import { createApp, h } from "vue";
// const app = createApp({});
// import { useRoute, useRouter } from "vue-router";

// export default function routeReplaceSelf(component: any) {
//   app.component("routeReplaceSelf", {
//     // template: "<div>home</div>",
//     name: "routeReplaceSelf",
//     computed: {
//       showChild(): any {
//         const deepestMatchedRoute = this.route.matched[this.route.matched.length - 1];
//         return deepestMatchedRoute.components.default !== this;
//       }
//     },
//     setup() {
//       const route = useRoute();
//       const router = useRouter();
//       return { route, router };
//     },
//     render() {
//       // const child = this.showChild ? h("router-view") : h(component);
//       console.log("🚀🚀", this.route.matched);
//       // console.log("🚀🚀", this.route.matched[this.route.matched.length - 1]);
//       // console.log("🚀🚀", this.route.matched[this.route.matched.length - 2]);
//       console.log("🚀🚀", this.route.matched[this.route.matched.length - 1].components.default);
//       // console.log("🚀🚀", this.router.options);
//       return h(component);
//     }
//   });
//   const routeReplaceSelf = app.component("routeReplaceSelf");
//   return routeReplaceSelf;
// }

import { h, computed, getCurrentInstance } from "vue";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
export default function routeReplaceSelf(component) {
  return {
    name: "routeReplaceSelf",
    setup(props) {
      const instance = getCurrentInstance();
      const route = useRoute();
      const router = useRouter();

      const showChild = computed(() => {
        const deepestMatchedRoute = route.matched[route.matched.length - 1].instances;
        console.log(route.matched, "instances");
        return deepestMatchedRoute !== instance;
      });
      // console.log(instance, "showChild");

      const child = showChild.value ? h("router-view") : h(component);
      return () => h("keep-alive", [child]);
    }
  };
}
