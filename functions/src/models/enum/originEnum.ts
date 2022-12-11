import { BaseEnum } from "../../FirebaseFunctionsLib/models/enum/base/baseEnum";

export enum OriginEnum {
  Home,
}


export class OriginClass extends BaseEnum<OriginEnum> {
  getInstance(value: OriginEnum, id?: number, label?: string, order?: number): BaseEnum<OriginEnum> {
    return new OriginClass(value, id, label, order);
  }

  getEnumValues(): (OriginEnum | string)[] {
    return Object.values(OriginEnum);
  }

  getNameByEnum(value: OriginEnum | number): string {
    const values = Object.values(OriginEnum);
    switch (value) {
      default:
        if (value.constructor.name === "Number" ) {
          return values[value].toString().replace("_", " ");
        } else if (value.constructor.name === "String" ) {
          return value.toString().replace("_", " ");
        }
        return "error origin name";
    }
  }


  visible(value: OriginEnum | string): boolean {
    const values = Object.values(OriginEnum);
    switch (value) {
      default:
        return true;
    }
  }

  getColorByEnum(value: number | BaseEnum<OriginEnum>): string {
    return "#19b817";
  }
}

