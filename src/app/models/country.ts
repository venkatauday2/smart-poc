export class Country {
    code: string;
    description: string;

    constructor(code: string, description: string) {
        this.code = code;
        this.description = description;
    }
}


export const COUNTRIES: Country[] = [new Country("840", "United States")
                                    ,new Country("841","Canada")
                                    ,new Country("842","India")]