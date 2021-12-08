import Mock from "mockjs";
console.log(Mock);

Mock.setup({
  timeout: 400,
  // timeout: "50-1000",
});

Mock.mock(/\/test1/, "get", () => {
  return {
    code: 200,
    result: 1,
  };
});
