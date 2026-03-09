import mongoose from 'mongoose';

try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI)
        throw new Error('MONGO_URI is missing, check your .env file');

    await mongoose.connect(MONGO_URI, {
        dbName: 'User',
    });
    console.log('MongoDB connected');
} catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
}
