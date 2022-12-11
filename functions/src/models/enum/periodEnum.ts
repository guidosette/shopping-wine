import { BaseEnum } from "../../FirebaseFunctionsLib/models/enum/base/baseEnum";

export enum PeriodEnum {
  Nothing,
  Single,
  Period,
}

export class PeriodClass extends BaseEnum<PeriodEnum> {

  getList(withAll?: boolean): PeriodClass[] {
    return super.getList(withAll) as PeriodClass[];
  }

  getInstance(value?: PeriodEnum, id?: number, label?: string, order?: number): BaseEnum<PeriodEnum> {
    return new PeriodClass(value, id, label, order);
  }

  getInstanceAll(): BaseEnum<PeriodEnum> {
    return this.getInstance(undefined, BaseEnum.getAllId(), 'Tutto');
  }

  getEnumValues(): (PeriodEnum | string)[] {
    return Object.values(PeriodEnum);
  }

  getNameByEnum(value: PeriodEnum | number): string {
    const values = Object.values(PeriodEnum);
    switch (value) {
      case values[PeriodEnum.Nothing]:
        return 'Nessuna data';
      case values[PeriodEnum.Single]:
        return 'Singola';
      case values[PeriodEnum.Period]:
        return 'Periodo';
      default:
        return 'error period name';
    }
  }

  getOrderByEnum(value: string | PeriodEnum): number {
    const values = Object.values(PeriodEnum);
    switch (value) {
      case values[PeriodEnum.Nothing]:
      case PeriodEnum.Nothing:
        return 0;
      case values[PeriodEnum.Single]:
      case PeriodEnum.Single:
        return 1;
      case values[PeriodEnum.Period]:
      case PeriodEnum.Period:
        return 2;
      default:
        return 0;
    }
  }

  visible(value: PeriodEnum | string): boolean {
    const values = Object.values(PeriodEnum);
    switch (value) {
      default:
        return true;
    }
  }

  public getStyleCustom() {
    return {
      'color': '#fff',
      'background-color': this.getColorByEnumCustom()
    };
  }

  public getColorByEnumCustom(): string {
    return '#28a745';
  }

  isNothing(): boolean {
    return this.id === PeriodEnum.Nothing;
  }

  isPeriod(): boolean {
    return this.id === PeriodEnum.Period;
  }

}
