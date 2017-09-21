import { Itinerary } from './itenary';
import { Account } from './account';

export class User {
    userId: string = "Rajesh";
    partnerBid: string = "12345678";
    userName: string;
    accountNumbers: Account[] = [];
    itenaries: Itinerary[] = [];
}

var user = new User();
user.userName = "Demo User";
user.accountNumbers = [new Account("4645191800301234"), new Account("4645191800301235")];
user.itenaries = [];

export const CURRENT_USER: User = user;
