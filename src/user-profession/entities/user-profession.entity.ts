import { Profession } from "../../profession/entities/profession.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'user_professions' })
@Unique('user_id_profession_id_index', ['user_id', 'profession_id']) 
export class UserProfession {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ unsigned: true })
    user_id: number

    @Column({ unsigned: true })
    profession_id: number

    @ManyToOne(type => User, user => user.id, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    users: User[];

    @ManyToOne(type => Profession, profession => profession.id, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'profession_id' })
    professions: Profession[];

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
