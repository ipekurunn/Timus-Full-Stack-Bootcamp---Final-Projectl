export interface FactoryDetail {
    id: number;
    name: string;
    membershipStartDate: Date;
    membershipEndDate: Date;
    employeeCount: number;
    isFreeMember: boolean;
    usingUnit: string;
    dateRange: { startDate: Date; endDate: Date };
    energyUsageKw: number;
    usageCost: number;
    discountedPrice: boolean;
  }