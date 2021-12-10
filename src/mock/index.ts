import Mock from "mockjs";

Mock.setup({
  timeout: 400
  // timeout: "50-1000",
});

Mock.mock(/\/test1/, "get", () => {
  return {
    code: 200,
    result: 1
  };
});
