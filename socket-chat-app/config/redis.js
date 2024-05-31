import util from 'util';

import redis from "redis"
import dotenv from "dotenv"
dotenv.config()

const client = redis.createClient({
    url: "redis://redis-17427.c1.asia-northeast1-1.gce.redns.redis-cloud.com:17427",

    password: "ZT8Xcb00sDa8bNefY3lKfsA0IyIxHSsy"
    // port: process.env.REDIS_PORT
})
client.on("connect", () => {
    console.log("redis connected")
})

client.on("error", (error) => {
    console.log("redis error: " + error)
})

const setClient = util.promisify(client.get).bind(client.get)
const getClient = util.promisify(client.get).bind(client);
const existsClient = util.promisify(client.exists).bind(client);

const set = async (key) => {
    const data = await setClient(key)
    return JSON.parse(data);
}


const get = async (key) => {
    const data = await getClient(key);
console.log(data)
    return JSON.parse(data);
};

const exists = async (key) => {
    const isExists = await existsClient(key);

    return isExists === 1;
};

export {
    set,
    get,
    exists,
}