export class CreateFactoryDto {
    readonly factoryName: string;
    readonly registrationDate: Date;
    readonly employeeCount: number;
    readonly isFreeMember: boolean;
  }
  
  export class UpdateFactoryDto {
    readonly factoryName?: string;
    readonly registrationDate?: Date;
    readonly employeeCount?: number;
    readonly isFreeMember?: boolean;
  }
  