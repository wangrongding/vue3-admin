import { createApp, defineComponent } from "vue";
const app = createApp({});
//递归渲染菜单(无限层级)
function loopDom(createElement: any, routers: any, path?: any) {
    return routers.map((route: any) => {
        if (route.custom) {
            return createElement("el-menu-item", [
                createElement("a", {
                    domProps: { href: route.path, target: "_blank", innerHTML: route.name },
                    style: {
                        height: "60px",
                        display: "block",
                    },
                }),
            ]);
        }
        const relativePath = path ? `${path}/${route.path}` : route.path;
        // console.log("relativePath: ", relativePath, "path: ", path, " route.path: ", route.path);
        if (route.children && route.children.length > 1) {
            return createElement(
                "el-submenu",
                {
                    props: {
                        index: route.name,
                    },
                    key: route.path,
                    style: {
                        display: route.status == 0 && "none",
                    },
                },
                [
                    createElement(
                        "template",
                        {
                            slot: "title",
                        },
                        [
                            createElement("i", {
                                class: route.icon,
                            }),
                            createElement("span", {
                                domProps: {
                                    innerHTML: route.name,
                                },
                            }),
                        ]
                    ),
                    loopDom(createElement, route.children, relativePath),
                ]
            );
        } else {
            return createElement(
                "el-menu-item",
                {
                    props: {
                        index: path
                            ? path + "/" + route.path
                            : route.path + (route.path == "/" ? "index" : "/index"),
                    },
                    attrs: {
                        path: path ? path + "/" + route.path : route.path,
                    },
                    style: {
                        display: route.status == 0 && "none",
                    },
                },
                [
                    createElement("i", {
                        class: route.icon,
                    }),
                    createElement("span", {
                        slot: "title",
                        domProps: {
                            innerHTML: route.name,
                        },
                    }),
                ]
            );
        }
    });
}

const menuList = app.component("menuList", {
    render(h: any) {
        return h(
            "el-menu",
            {
                props: {
                    "background-color": "#516FA3",
                    "text-color": "#fff",
                    "active-text-color": "#ffd04b",
                    "unique-opened": true,
                    mode: "horizontal",
                    "menu-trigger": "click",
                    router: true,
                    "default-active": this.activeRoute,
                },
                on: {
                    select: this.menuClick,
                },
            },
            loopDom(h, this.routers)
        );
    },
    props: {
        routers: {
            type: Array,
            default: () => [],
        },
        isCollapse: {
            type: Boolean,
            default: true,
        },
        activeRoute: {
            type: String,
            default: "",
        },
    },
    created() {
        console.log("routers11", this.routers);
    },
    methods: {
        menuClick(index: any, indexPath: any, c: any) {
            console.log(index, indexPath, c);
        },
    },
});

export default menuList;
