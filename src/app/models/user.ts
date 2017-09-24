import { Itinerary } from './itenary';
import { Account } from './account';

export class User {
    userId: string = "mohan.kumar@schwab.com";
    partnerBid: string = "10074101";
    userName: string;
    accounts: Account[] = [];
    itenaries: Itinerary[] = [];
}

//Mock some accounts
let account1 = new Account("4121254490035911");
account1.cardName = "Schwab Travel Rewards Debit Card";
account1.imageUrl = "../assets/images/card1.png";
let account2 = new Account("4121254490035912")
account2.imageUrl = "../assets/images/card2.png";
account2.cardName ="Schwab Cash Rewards Debit Card";

//Mock some user
var user = new User();
user.userName = "mohan.kumar@schwab.com";
user.accounts = [account1, account2];
user.itenaries = [];


export const CURRENT_USER: User = user;
