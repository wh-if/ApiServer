import BaseMapper from "./BaseMapper";
export interface Address {
  id?: string;
  userId?: string;
  receiverName?: string;
  tag?: string;
  receiverPhone?: string;
  position?: string;
  detailAddress?: string;
  isDefault?: number;
}
class AddressMapper extends BaseMapper<Address> {
  constructor() {
    super("address");
  }
}

export const addressMapper = new AddressMapper();
