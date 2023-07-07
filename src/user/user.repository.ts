import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entitiy";
import { Repository } from "typeorm";

@Injectable()
export class userRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
  
}