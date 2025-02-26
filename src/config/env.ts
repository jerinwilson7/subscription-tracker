

export const config = {
 env:{
    NODE_ENV: process.env.NODE_ENV!,
    PORT: process.env.PORT!,
    MONGO_URI: process.env.MONGO_URI!,
    JWT_SECRET: process.env.JWT_SECRET!,
   JWT_EXPIRY: process.env.JWT_EXPIRY!,
 }
}
