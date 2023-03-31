export class JsonSchemaDto {
  name: string;
  type: typesDto;
  tag: string;
  description: string;
  value: string;
  isActive: boolean;
  options: optionsDto;
}

export class optionsDto {
  nullable: boolean;
  autoincrement: boolean;
}

export class typesDto {
  datatype: string;
  width: number;
}
