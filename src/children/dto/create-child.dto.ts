import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateChildDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  location: string

  @IsBoolean()
  @IsOptional()
  isGood?: boolean
}
