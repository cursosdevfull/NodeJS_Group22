import * as bcrypt from "bcryptjs";

export class Encrypt {
    static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    static async comparePasswords(password: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(password, hashed);
    }
}