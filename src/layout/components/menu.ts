import Vue from "vue";
function loopDom(createElement: any, routers: any, path?: any) {
    return routers.map((route: any) => {
        const relativePath = path ? `${path}/${route.front_name}` : route.front_name;
        if (route.children.length) {
            return createElement(
                "el-submenu",
                {
                    props: {
                        index: route.front_name,
                    },
                    style: {
                        display: route.status == 0 && "none",
                    },
                    key: route.front_name,
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
                                    innerHTML: route.title,
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
                        index: `${path}/${route.front_name}`,
                    },
                    attrs: {
                        path: `${path}/${route.front_name}`,
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
                            innerHTML: route.title,
                        },
                    }),
                ]
            );
        }
    });
}
const { createApp, defineComponent } = Vue;

const app = createApp({});

const menuList = app.component("menuList", {
    render(h: any) {
        return h(
            "el-menu",
            {
                class: "menu-part",
                props: {
                    router: true,
                    collapse: this.isCollapse,
                    "default-active": this.activeRoute,
                    "background-color": "#282E46",
                    "text-color": "#fff",
                    "active-text-color": "#ffd04b",
                    "unique-opened": true,
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
    /* ... */
    methods: {
        menuClick(index: any, indexPath: any, c: any) {
            console.log(index, indexPath, c);
        },
    },
    menuClick(index: any, indexPath: any, c: any) {
        console.log(index, indexPath, c);
    },
});

export default menuList;
