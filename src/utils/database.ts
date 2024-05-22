import { Schema } from 'mongoose';

export const setIndexes = (schema: Schema) => {
    schema.index({ telegramId: 1}, { unique: true })
    schema.index({ referralLink: 1}, { unique: true })
};