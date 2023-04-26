import { IsNotEmpty, IsString
  } from 'class-validator';
  import { ApiProperty, PartialType } from '@nestjs/swagger';

  
export class UploadDataEntry {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    codeProject?: string;
  }