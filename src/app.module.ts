import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { ProfessionModule } from './profession/profession.module';
import { UserProfessionModule } from './user-profession/user-profession.module';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './config/database.config';
import { Admin } from './admin/entities/admin.entity';
import { User } from './user/entities/user.entity';
import { Profession } from './profession/entities/profession.entity';
import { UserProfession } from './user-profession/entities/user-profession.entity';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';
import { UniqueConstraint } from './validation/unique.decorator';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        ignoreTLS: false,
        secure: false,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: `${process.env.APP_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Admin, User, Profession, UserProfession],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    UserModule,
    AdminModule,
    ProfessionModule,
    UserProfessionModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, UniqueConstraint],
})
export class AppModule { }
