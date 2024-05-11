import { config } from "dotenv";

const configFile = `./.env`;
config({ path: configFile });

// config environment variables
const { MONGO_URI, PORT, JWT_SECRET, NODE_ENV, MESSAGE_BROKER_URL } =
    process.env;

export default {
    MONGO_URI,
    PORT,
    JWT_SECRET,
    env: NODE_ENV,
    msgBrokerURL: MESSAGE_BROKER_URL,
};