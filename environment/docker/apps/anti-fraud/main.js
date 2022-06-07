import axios from 'axios';
import http from 'http';

const makeRequest = () => {
  const data = { ok: true };
  axios
    .post('http://host.docker.internal:3000/payments', data)
    .then((res) => console.log(`Status: ${res.status}`))
    .catch(console.error);
};

const server = http.createServer((req, res) => {
  console.log(`Request received from route ${req.url}`);
  if (req.url === '/payments') {
    new Promise((resolve) => setTimeout(resolve, 5000)).then(makeRequest);
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(202);
  }
  res.end();
});

server.listen(3000);
