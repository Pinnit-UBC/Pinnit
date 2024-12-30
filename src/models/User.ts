import mongoose, { Document, Schema, Model, model } from 'mongoose';

// Define the TypeScript interface for the User model
export interface IUser extends Document {
  email: string;
  password_hash: string;
  created_at: Date;
}

// Create the Mongoose schema for the User model
const userSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

// Export the User model with the TypeScript type
const User: Model<IUser> = mongoose.models.User || model<IUser>('User', userSchema);
export default User;
