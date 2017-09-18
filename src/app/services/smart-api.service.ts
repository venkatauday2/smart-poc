import { CURRENT_USER, User } from '../models/user';
import { Injectable } from '@angular/core';


@Injectable()
export class SmartApiService {

  constructor() { }

  public user: User;

  getUser(): Promise<User> {
    return Promise.resolve(CURRENT_USER);
  }

}
