module.exports = {
  // 此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,
  // 全局环境
  env: {
    "vue/setup-compiler-macros": true,
    node: true,
    es2021: true,
    node: true
  },
  // 指定如何解析语法。可以为空，但若不为空，只能配该值
  parser: "vue-eslint-parser",
  // 优先级低于parse的语法解析配置
  parserOptions: {
    // 指定ESlint的解析器
    parser: "@typescript-eslint/parser",
    // 允许使用ES语法
    ecmaVersion: 2020,
    // 允许使用import
    sourceType: "module",
    // 允许解析JSX
    ecmaFeatures: {
      jsx: true
    }
    // extraFileExtensions: [".vue"],
  },
  extends: [
    // // "plugin:vue/base",
    // "eslint:recommended",
    // // "plugin:vue/essential",
    // "plugin:vue/vue3-recommended",
    // "plugin:@typescript-eslint/recommended",
    // "plugin:@typescript-eslint/eslint-recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  // plugins: ["vue", "@typescript-eslint"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "windows"], //换行符风格 |unix|windows|
    "comma-dangle": ["error", "never"], //禁止使用拖尾逗号
    quotes: ["error", "double"], //使用双引号或单引号
    semi: ["error", "always"], //语句末尾使用分号
    // "vue/no-multiple-template-root": "off",//不允许向模板添加多个根节点
    "@typescript-eslint/no-explicit-any": ["off"] //关闭any类型的警告
  }
};
