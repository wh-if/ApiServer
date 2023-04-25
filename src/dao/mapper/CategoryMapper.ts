
import BaseMapper from "./BaseMapper";
export interface Category {
  id?: string;
  superId?: string;
  name?: string;
  position?: string;
}
class CategoryMapper extends BaseMapper<Category> {
  constructor() {
    super("category");
  }
}

export const categoryMapper = new CategoryMapper();
