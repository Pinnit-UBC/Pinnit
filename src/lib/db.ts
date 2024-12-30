import mongoose from 'mongoose';

// Function to connect to MongoDB
const connectMongo = async (): Promise<void> => {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(process.env.MONGO_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectMongo;
