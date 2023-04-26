import { IsArray, IsNotEmpty, IsString
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';

  
export class DataDomainValidation {
    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    data?: [];

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    code?: string;
  }