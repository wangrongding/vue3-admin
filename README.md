# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

---

## vue3 项目实践

vite.config.js 文件中无法使用 require
如果我们使用的是`typeScript2.x`,则需要通过安装@types/node 来解决

## 关于 vue3 的代码校验

### 语法风格检测：ESLint+Prettier

Vue3.0 的项目中如何使用 ESLint 和 Prettier 对代码风格进行约束。
首先安装这几个包：

`eslint`代码质量检测（用 var 还是 let，用==还是===...）
`prettier`代码风格检测（加不加尾逗号，单引号还是双引号...）
`eslint-config-prettier`解决 ESLint 与 Prettier 的风格冲突
`eslint-plugin-prettier`ESLint 的插件，集成 Prettier 的功能
`eslint-plugin-vue`ESLint 的插件，增加 Vue 的检测能力
`@typescript-eslint/eslint-plugin`

### Git Message 提交规范：Angular 提交规范

https://blog.csdn.net/Ed7zgeE9X/article/details/118097302
test
