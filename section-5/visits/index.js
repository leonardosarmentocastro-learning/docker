const express = require('express');
const redis = require('redis');

const DOCKER_COMPOSE_SERVICES = {
  redis_server: { name: 'redis_server' },
  node_app: { name: 'node_app', port: 8081 },
};

const app = express();
const client = redis.createClient({
  host: DOCKER_COMPOSE_SERVICES.redis_server.name,
  port: 6379
});
client.set('visits', 0);

app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    res.send('Number of visits is ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(DOCKER_COMPOSE_SERVICES.node_app.port, () => {
  console.log(`Listening on port ${DOCKER_COMPOSE_SERVICES.node_app.port}`);
});
