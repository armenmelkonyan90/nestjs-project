import { Admin } from "../admin/entities/admin.entity";
import { Profession } from "../profession/entities/profession.entity";
import { UserProfession } from "../user-profession/entities/user-profession.entity";
import { User } from "../user/entities/user.entity";

export const dbConfig = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Admin, User, Profession, UserProfession],
    synchronize: true,
};