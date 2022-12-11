import { BaseEnum } from "src/app/FirebaseBackofficeLib/utils/enum/base/baseEnum";

export enum OriginEnum {
  Home,
}


export class OriginClass extends BaseEnum<OriginEnum> {
  override getInstance(value: OriginEnum, id?: number, label?: string, order?: number): BaseEnum<OriginEnum> {
    return new OriginClass(value, id, label, order);
  }

  override getEnumValues(): (OriginEnum | string)[] {
    return Object.values(OriginEnum);
  }

  override getNameByEnum(value: OriginEnum | number): string {
    const values = Object.values(OriginEnum);
    switch (value) {
      // case values[OriginEnum.Home]:
      // case OriginEnum.Home:
      //   return "Home";
      default:
        if (value.constructor.name === "Number" ) {
          return values[value].toString().replace("_", " ");
        } else if (value.constructor.name === "String" ) {
          return value.toString().replace("_", " ");
        }
        return "error origin name";
    }
  }

  // override getOrderByEnum(value: string | OriginEnum): number {
  //   const values = Object.values(OriginEnum);
  //   switch (value) {
  //     case values[OriginEnum.Home]:
  //     case OriginEnum.Home:
  //       return 0;
  //     default:
  //       return -1;
  //   }
  // }

  override visible(value: OriginEnum | string): boolean {
    const values = Object.values(OriginEnum);
    switch (value) {
      default:
        return true;
    }
  }

  public override getColorByEnum(value: number | BaseEnum<OriginEnum>): string {
    return "#19b817";
  }
}

