import BaseMapper from "./BaseMapper";
export interface Product {
  id?: string;
  name?: string;
  description?: string;
  tag?: string;
  buyOptions?: string;
  configuration?: string;
  content?: string;
  poster?: string;
  stock?: number;
  categoryId?: string;
}
class ProductMapper extends BaseMapper<Product> {
  constructor() {
    super("product");
  }
}

export const productMapper = new ProductMapper();
