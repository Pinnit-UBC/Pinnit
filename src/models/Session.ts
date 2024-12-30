import mongoose, { Document, Schema, Model, model } from 'mongoose';

// Define the TypeScript interface for the Session model
export interface ISession extends Document {
  user_id: mongoose.Types.ObjectId; // Reference to User
  session_token: string;
  expires_at: Date;
}

// Create the Mongoose schema for the Session model
const sessionSchema: Schema<ISession> = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  session_token: { type: String, required: true },
  expires_at: { type: Date, required: true },
});

// Export the Session model with the TypeScript type
const Session: Model<ISession> = mongoose.models.Session || model<ISession>('Session', sessionSchema);
export default Session;
