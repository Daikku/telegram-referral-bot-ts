import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    telegramId: number;
    referralLink: string;
    referredBy: number;
    directReferrals: number[];
    indirectReferrals: number[];
    balance: number;
    language: string;
}

const userSchema = new Schema<IUser>({
    telegramId: { type: Number, unique: true, required: true },
    referralLink: { type: String, unique: true },
    referredBy: { type: Number, default: null},
    directReferrals: [{ type: Number }],
    indirectReferrals: [{ type: Number }],
    balance: { type: Number , default: 0},
    language: { type: String, default: "ru" }
});

export const User = model<IUser>("User", userSchema);
