import { State } from './state';
export class Destination {
    state: string;
    country: string;

    constructor(state: string, country: string) {
        this.state = state;
        this.country = country;

    }

}