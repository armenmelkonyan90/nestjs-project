import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { StatusList } from "../status.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: StatusList,
        default: StatusList.PENDING
    })
    status: string;

    @Column({
        unique: true
    })
    username: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        unique: true
    })
    phone: string;

    @Column()
    password: string;

    @Column({
        nullable: true
    })
    token: string;

    @Column({
        nullable: true,
        type: 'datetime'
    })
    token_exp_date: string;

    @Column({
        nullable: true,
        type: 'datetime'
    })
    activation_date: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updated_at: string;
}