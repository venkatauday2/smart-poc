import { Itinerary } from './itenary';
import { Account } from './account';

export class User {
    userId: string = "Rajesh";
    partnerBid: string = "12345678";
    userName: string;
    accounts: Account[] = [];
    itenaries: Itinerary[] = [];
}

//Mock some accounts
let account1 = new Account("4645191800301234");
account1.cardName = "Schwab Travel Rewards Debit Card";
account1.imageUrl = "../../src/assets/images/card1.png";
let account2 = new Account("4645191800301235")
account2.imageUrl = "../../src/assets/images/card2.png";
account2.cardName ="Schwab Cash Rewards Debit Card";

//Mock some user
var user = new User();
user.userName = "Smart User";
user.accounts = [account1, account2];
user.itenaries = [];


export const CURRENT_USER: User = user;
