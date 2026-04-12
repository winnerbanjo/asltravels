import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
export const hasMongoConfig = Boolean(MONGODB_URI);

if (!hasMongoConfig) {
  console.warn("MONGODB_URI is missing.");
}

declare global {
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const cached = global.mongooseCache || {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not configured.");
    }

    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
