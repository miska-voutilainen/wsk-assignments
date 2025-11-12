import * as appModule from './app.js';

const app = appModule.default ?? appModule.app ?? appModule;

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
