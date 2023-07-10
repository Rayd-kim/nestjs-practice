import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Board } from "src/boards/board.entitiy";
import { User } from "src/user/user.entitiy";

export const typeORMConfig : TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'youskim',
  password: 'dbtjd0513',
  database: 'test',
  // entities: [__dirname + '/../**/*.entitiy.{js,ts}'],
  entities : [User, Board],
  synchronize: true
}

export const userTypeORMconf : TypeOrmModuleOptions = {
  type: 'postgres',
  host: '172.17.0.3',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'test',
  entities: [User, Board],
  synchronize: true
}