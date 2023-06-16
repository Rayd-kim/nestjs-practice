import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
  type: 'postgres',
  host: '172.17.0.3',
  port: 5432,
  username: 'postgres',
  password: 'dbtjd0513',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entitiy.{js,ts}'],
  synchronize: true
}