import { AjaxResult } from "../util/AjaxResult";
import { Controller, HttpMethodEnum } from "../model";
import jwt from "jsonwebtoken";
import { userMapper } from "../dao/mapper/UserMapper";
import { addressMapper } from "../dao/mapper/AddressMapper";

const controller: Controller[] = [
  // 获取用户列表
  {
    path: "/user",
    method: HttpMethodEnum.GET,
    handler: async (ctx) => {
      ctx.body = await userMapper.select({ id: "1" });
    },
  },
  // 登录
  {
    path: "/login",
    method: HttpMethodEnum.POST,
    handler: async (ctx) => {
      const { accountNumber, password } = ctx.request.body;
      const user = await userMapper.selectOne({ accountNumber });
      if (user && password === user.password) {
        Reflect.deleteProperty(user, "id");
        Reflect.deleteProperty(user, "password");
        const token = jwt.sign({ ...user }, "vshop");
        ctx.body = AjaxResult.success("登录成功！", { ...user, token });
      } else {
        ctx.body = AjaxResult.error("用户名或密码错误！");
      }
    },
  },
  // 注册
  {
    path: "/register",
    method: HttpMethodEnum.POST,
    handler: async (ctx) => {
      ctx.body = ctx.is("multipart");
    },
  },
  // 获取用户地址列表 /address?userId=xx
  {
    path: "/address",
    method: HttpMethodEnum.GET,
    handler: async (ctx) => {
      const { userId } = ctx.query;
      const resultList = await addressMapper.select({
        userId: userId as string,
      });
      ctx.body = AjaxResult.success(resultList);
    },
  },
  //
  {
    path: "/address",
    method: HttpMethodEnum.POST,
    handler: async (ctx) => {
      const result = await addressMapper.insert(ctx.request.body);

      if (result) {
        ctx.body = AjaxResult.success();
      } else {
        ctx.body = AjaxResult.error();
      }
    },
  },
  // 更新
  {
    path: "/address/:id",
    method: HttpMethodEnum.PUT,
    handler: async (ctx) => {
      const result = await addressMapper.update(ctx.request.body, {
        id: ctx.params.id,
      });

      if (result) {
        ctx.body = AjaxResult.success();
      } else {
        ctx.body = AjaxResult.error();
      }
    },
  },
  {
    path: "/address/:id",
    method: HttpMethodEnum.DELETE,
    handler: async (ctx) => {
      const result = await addressMapper.remove({ id: ctx.params.id });
      if (result) {
        ctx.body = AjaxResult.success();
      } else {
        ctx.body = AjaxResult.error();
      }
    },
  },
];

export default controller;
