import request from "../request";

// 查找头像图片
export function getImgUrl(data?: object) {
  return request.get("/platform-user/userext/getImgUrl", { data });
}
