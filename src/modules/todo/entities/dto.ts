export class CreateDTO {
  title: string;
  isCompleted?: boolean;
}

export class UpdateDTO {
  id: string;
  title: string;
  isCompleted?: boolean;
}
