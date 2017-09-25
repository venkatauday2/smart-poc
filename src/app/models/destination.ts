import { Country } from './country';
import { State } from './state';
export class Destination {
    state: State;
    country: Country;

    constructor(state: State, country: Country) {
        this.state = state;
        this.country = country;
    }
}