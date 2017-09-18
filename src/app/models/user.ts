import { Itenary } from './itenary';
import { Account } from './account';

export class User {
    userName: string;
    accountNumbers: Account[] = [];
    itenaries: Itenary[] = [];
}

var user = new User();
user.userName = "Demo User";
user.accountNumbers = [new Account("2374242748274827", true, false), new Account("2345432565347634", true, false)];
user.itenaries = [];

export const CURRENT_USER: User = user;
