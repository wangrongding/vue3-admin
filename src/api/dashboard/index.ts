import request from "../request";

export function dashboardInfo() {
  request.get("/his-admin/user/sysUserListPage", {});
}
