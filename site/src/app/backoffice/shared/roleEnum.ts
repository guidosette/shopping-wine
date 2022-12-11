import { BaseEnum } from "src/app/FirebaseBackofficeLib/utils/enum/base/baseEnum";

export enum RoleEnum {
  SuperAdmin,
  Admin,
  Customer,
}

export class RoleClass extends BaseEnum<RoleEnum> {

  override getInstance(value: RoleEnum, id?: number, label?: string, order?: number): BaseEnum<RoleEnum> {
    return new RoleClass(value, id, label, order);
  }

  override getEnumValues(): (RoleEnum | string)[] {
    return Object.values(RoleEnum);
  }

  override getList(withAll: boolean): BaseEnum<RoleEnum>[] {
    var result = super.getList(withAll);
    result = result.filter(obj => obj.id !== RoleEnum.SuperAdmin.valueOf());
    return result;
  }

  override getNameByEnum(value: RoleEnum | number): string {
    const values = Object.values(RoleEnum);
    switch (value) {
      case values[RoleEnum.SuperAdmin]:
      case RoleEnum.SuperAdmin:
        return 'Super Admin';
      case values[RoleEnum.Admin]:
      case RoleEnum.Admin:
        return 'Admin';
      case values[RoleEnum.Customer]:
      case RoleEnum.Customer:
        return 'Utente';
      default:
        return 'error role name';
    }
  }

  override visible(value: RoleEnum | string): boolean {
    const values = Object.values(RoleEnum);
    switch (value) {
      default:
        return true;
    }
  }

  public override getColorByEnum(value: number | BaseEnum<RoleEnum>): string {
    return '#005e83';
  }

}
