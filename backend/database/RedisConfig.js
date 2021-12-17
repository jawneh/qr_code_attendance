const client = require("redis").createClient()
const { promisify } = require("util")

client.on("connect", () => {
  console.log("Redis client is connected".bgRed)
})

client.on("error", error => {
  console.error(error + "".red)
})

const redis_del = promisify(client.del).bind(client)
const redis_get = promisify(client.get).bind(client)
const redis_getList = promisify(client.lrange).bind(client)
const redis_set = promisify(client.set).bind(client)
const redis_setexpiry = promisify(client.setex).bind(client)
const redis_incr = promisify(client.incr).bind(client)

module.exports = {
  redis_del,
  redis_get,
  redis_getList,
  redis_set,
  redis_setexpiry,
  redis_incr,
}
