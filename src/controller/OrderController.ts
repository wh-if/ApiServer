import { orderItemMapper, orderMapper } from "../dao/mapper/OrderMapper";
import { Controller, HttpMethodEnum } from "../model";
import { AjaxResult } from "../util/AjaxResult";

const controller: Controller[] = [
  // 获取用户订单列表 /order?userId=xx orderId=xx
  {
    path: "/order",
    method: HttpMethodEnum.GET,
    handler: async (ctx) => {
      const { userId, orderId } = ctx.query;
      let result;
      if (!!orderId) {
        result = await orderMapper.selectOne({ id: orderId as string });
        result.productItems = await orderItemMapper.get({ orderId });
        result.productItems.forEach((item) => {
          item.productPicture = item.poster[0];
        });
      } else {
        result = await orderMapper.select({ userId: userId as string });
        for (const iterator of result) {
          const productItems = await orderItemMapper.get({
            orderId: iterator.id,
          });
          iterator.productPictures = productItems.map((i) => i.poster[0]);
          iterator.totalPrice = productItems.reduce(
            (pre, cur) =>
              pre +
              cur.buyOptions[cur.activeOption].discountPrice * cur.buyCount,
            0
          );
        }
      }

      ctx.body = AjaxResult.success(result);
    },
  },
  //
  {
    path: "/order",
    method: HttpMethodEnum.POST,
    handler: async (ctx) => {
      const { userId, addressId, productItems } = ctx.request.body;
      // gen orderNumber  createTime status payTime
      const newOrder = {
        userId,
        addressId,
        createTime: Date.now().toString(),
        status: 0,
        orderNumber:
          Date.now().toString(24) + Math.random().toString(24).slice(2),
      };

      const resultId = await orderMapper.insert(newOrder);
      // add orderitem
      productItems.forEach(async (item: any) => {
        const newOrderItem = {
          orderId: resultId.toString(),
          productId: item.productId,
          activeOption: item.activeOption,
          buyCount: item.buyCount,
        };
        await orderItemMapper.insert(newOrderItem);
      });

      // if (result) {
      ctx.body = AjaxResult.success({ orderId: resultId });
      // } else {
      //   ctx.body = AjaxResult.error();
      // }
    },
  },
  // 更新
  {
    path: "/order/:id",
    method: HttpMethodEnum.PUT,
    handler: async (ctx) => {
      const result = await orderMapper.update(ctx.request.body, {
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
    path: "/order/:id",
    method: HttpMethodEnum.DELETE,
    handler: async (ctx) => {
      const result = await orderMapper.remove({ id: ctx.params.id });
      // remove orderitem
      if (result) {
        ctx.body = AjaxResult.success();
      } else {
        ctx.body = AjaxResult.error();
      }
    },
  },
  {
    path: "/order/pay/:id",
    method: HttpMethodEnum.PUT,
    handler: async (ctx) => {
      const { payFinish } = ctx.request.body;
      if (payFinish) {
        const result = await orderMapper.update(
          { status: 1, payTime: Date.now().toString() },
          { id: ctx.params.id }
        );
        ctx.body = AjaxResult.success();
        return;
      }
      ctx.body = AjaxResult.error();
    },
  },
];

export default controller;
