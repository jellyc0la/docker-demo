const http = require("http")
const redis = require("redis")

const client = redis.createClient({host: 'redis-service'})

const server = http.createServer((req, res) => {
  client.incr("page_views", (err) => {
    if (err) {
      console.log(`Error incrementing page_views in redis: ${err}`)
      process.exit(1)
    }
    console.log('Increment page_views success')

    client.get("page_views", (err, reply) => {
      console.log(`get page_views success. value is ${reply}`)

      if (err) {
        console.log(`Error reading page_views in redis: ${err}`)
        process.exit(1)
      }

      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(reply)
    })
  })
})

server.listen(9090, (err) => {
  if (err) {
    console.log(`Error starting server: ${err}`)
    return
  }
  console.log("Server is listening");
})
