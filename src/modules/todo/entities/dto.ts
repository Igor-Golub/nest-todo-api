import { ApiProperty } from '@nestjs/swagger';

export class CreateDTO {
  @ApiProperty()
  title: string;

  @ApiProperty({
    required: false,
  })
  isCompleted?: boolean;
}

export class UpdateDTO {
  @ApiProperty()
  id: string;

  @ApiProperty({
    required: false,
  })
  title: string;

  @ApiProperty({
    required: false,
  })
  isCompleted?: boolean;
}
