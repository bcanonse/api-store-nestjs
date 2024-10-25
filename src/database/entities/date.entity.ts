import {
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class DateAt {
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updatedAt: Date;
}
