import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator"
import { Material } from "@prisma/client"

export class CreateToyDto {
  @IsString()
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  @IsEnum(Material)
  material: Material
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  weight: number
} 
