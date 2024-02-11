import * as bcrypt from 'bcrypt';


const saltRounds = 10;

export async function encrypt(text: string): Promise<string> {
    const hashedText = await bcrypt.hash(text, saltRounds);
    return hashedText;
}

export async function compare(plainText: string, hashedText: string): Promise<boolean> {
    return await bcrypt.compare(plainText, hashedText);
}