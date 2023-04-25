import BaseMapper from "./BaseMapper";
import mysql from "mysql";
export interface Order {
  id?: string;
  orderNumber?: string;
  userId?: string;
  addressId?: string;
  createTime?: string;
  status?: number;
  payTime?: string;
}

export interface OrderItem {
  id?: string;
  orderId?: string;
  productId?: string;
  activeOption?: string;
  buyCount?: number;
}
class OrderItemMapper extends BaseMapper<OrderItem> {
  constructor() {
    super("order_item");
  }

  // 订单所包含的产品
  async get(whereValues) {
    // const results = await select(this.TABLE_NAME, whereValues);
    return new Promise<Record<string, any>[]>((resolve, reject) => {
      this.POOL.query(
        `select \`${this.TABLE_NAME}\`.id as id, productId, activeOption, buyCount, buyOptions, poster, \`name\` as productName from \`${this.TABLE_NAME}\`, product where orderId = ${whereValues.orderId} and product.id = productId
    `,
        (error, results, fields) => {
          if (error) throw error;
          fields.forEach((field) => {
            if (field.type === mysql.Types.JSON) {
              results.forEach(
                (item) => (item[field.name] = JSON.parse(item[field.name]))
              );
            }
          });
          resolve(results);
        }
      );
    });
  }
}

export const orderItemMapper = new OrderItemMapper();
class OrderMapper extends BaseMapper<Order> {
  constructor() {
    super("order");
  }
}

export const orderMapper = new OrderMapper();
