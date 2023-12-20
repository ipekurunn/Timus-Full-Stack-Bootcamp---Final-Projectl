export class CreateFactoryDetailDto {
    readonly usingUnit: string;
    readonly dateRange: Date;
    readonly usageKw: number;
    readonly usageCost: number;
    readonly discountedPrice: boolean;
  }
  
  export class UpdateFactoryDetailDto {
    readonly usingUnit?: string;
    readonly dateRange?: Date;
    readonly usageKw?: number;
    readonly usageCost?: number;
    readonly discountedPrice?: boolean;
  }
  