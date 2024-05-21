import mongoose from 'mongoose';
import { config } from "./config";

export const connectToDatabase = async(): Promise<void> => {
    try {
        await mongoose.connect(config.mongoURI as string);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}