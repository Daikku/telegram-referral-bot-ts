import { Schema, model, Document } from 'mongoose';
import { setIndexes } from "../utils/database";

export interface IUser extends Document {
    telegramId: number;
    referralLink: string;
    referredBy: number;
    directReferrals: number[];
    indirectReferrals: number[];
    balance: number;
    language: string;
    isSubscribe: boolean;
}

const userSchema = new Schema<IUser>({
    telegramId: { type: Number, unique: true, required: true, index: true},
    referralLink: { type: String, unique: true },
    referredBy: { type: Number, default: null},
    directReferrals: [{ type: Number }],
    indirectReferrals: [{ type: Number }],
    balance: { type: Number , default: 0},
    language: { type: String, default: "ru" },
    isSubscribe: { type: Boolean, default: false }
});

setIndexes(userSchema);
export const User = model<IUser>("User", userSchema);
