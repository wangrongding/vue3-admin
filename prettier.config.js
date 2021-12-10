/**
 * 参考 https://prettier.io/docs/en/options.html
 */
module.exports = {
  printWidth: 100, // 换行的宽度
  proseWrap: "always", // 当超出print width时就折行 always|never|preserve
  tabWidth: 2, // 空格数
  useTabs: false, // 是否开启tab
  semi: true, // 是否在语句末尾打印分号
  singleQuote: false, // 是否使用单引号
  quoteProps: "as-needed", // 对象的key仅在需要时用引号 as-needed|consistent|preserve
  trailingComma: "none", // 多行时尽可能打印尾随逗号 |all|es5|none
  rangeStart: 0, // 每个文件格式化的范围是文件的全部内容
  bracketSpacing: true, // 对象文字中的括号之间打印空格
  jsxSingleQuote: false, // 在JSX中是否使用单引号
  // jsxBracketSameLine: false,// 将 > 多行 JSX 元素放在最后一行的末尾，而不是单独放在下一行（不适用于自闭元素）,默认false,这里选择>不另起一行
  arrowParens: "always", // 箭头函数，只有一个参数的时候，也需要括号 always|avoid
  htmlWhitespaceSensitivity: "strict", // html中换行规则 |strict|ignore|
  vueIndentScriptAndStyle: false, // vue中script与style里的第一条语句是否空格
  endOfLine: "lf", // 换行符
  embeddedLanguageFormatting: "auto"
};
