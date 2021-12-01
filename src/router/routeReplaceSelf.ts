// export default function routeReplaceSelf(component: any) {
//   return {
//     name: "routeReplaceSelf",
//     computed: {
//       showChild(): any {
//         const deepestMatchedRoute = this.$route.matched[this.$route.matched.length - 1];
//         return deepestMatchedRoute.instances.default !== this;
//       },
//     },
//     render(h: any): any {
//       const child = this.showChild ? h("router-view") : h(component);
//       return h("keep-alive", [child]);
//     },
//   };
// }
