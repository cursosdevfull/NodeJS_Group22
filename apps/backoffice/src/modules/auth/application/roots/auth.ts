export class Auth {
    constructor(private readonly email: string, private readonly password: string) { }

    toJSON() {
        return {
            email: this.email,
            password: this.password
        }
    }
}