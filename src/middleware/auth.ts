import jwt from "jsonwebtoken";
import { AjaxResult } from "../util/AjaxResult";
import Koa from "koa";

export const auth: () => Koa.Middleware<
  Koa.DefaultState,
  Koa.DefaultContext,
  any
> = () => {
  const whiteList = [
    "/login",
    "/register",
    "/banner",
    "/static",
    "/product",
    "/category",
    "/address",
  ];
  return async (ctx, next) => {
    const findIndex = whiteList.findIndex((item) => ctx.path.startsWith(item));
    if (findIndex === -1) {
      try {
        const decoded = jwt.verify(ctx.headers.token as string, "vshop");
      } catch (error) {
        ctx.body = AjaxResult.error("token 已过期或不存在, 请重新登录");
        return;
      }
    }
    await next();
  };
};
