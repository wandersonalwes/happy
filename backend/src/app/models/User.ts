import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  password_reset_token?: string

  @Column({ nullable: true })
  password_reset_expires?: Date
}