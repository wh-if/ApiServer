import { HttpMethodEnum } from "koa-body";
import { AjaxResult } from "../util/AjaxResult";
import { categoryMapper } from "../dao/mapper/CategoryMapper";
import { Category } from "../dao/mapper/CategoryMapper";
import { Controller } from "../model";
import { productMapper } from "../dao/mapper/ProductMapper";

const controller: Controller[] = [
  // 获取列表 /product?categoryId=xx
  {
    path: "/product",
    method: HttpMethodEnum.GET,
    handler: async (ctx) => {
      const { categoryId, productId, searchKeyWord = "" } = ctx.query;
      if (productId) {
        ctx.body = AjaxResult.success(
          await productMapper.selectOne({ id: productId as string })
        );
      } else if (categoryId) {
        ctx.body = AjaxResult.success(
          await productMapper.select({ categoryId: categoryId as string })
        );
      } else {
        ctx.body = AjaxResult.success(
          await productMapper.search(searchKeyWord as string, [
            "name",
            "description",
          ])
        );
      }
    },
  },
  // 获取列表
  {
    path: "/category",
    method: HttpMethodEnum.GET,
    handler: async (ctx) => {
      const list = await categoryMapper.select({});
      const resultList = list.filter((item) => item.superId === "0");
      list.forEach((item) => {
        const resultItem = resultList.find(
          (i) => i.id === item.superId
        ) as Category & { children: Category[] };
        if (!!resultItem) {
          if (Array.isArray(resultItem.children)) {
            resultItem.children.push(item);
          } else {
            resultItem.children = [item];
          }
        }
      });
      ctx.body = resultList;
    },
  },
];
export default controller;
