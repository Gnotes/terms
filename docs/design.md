## Design terms

- UI

> User interface

```js
const chalk = require("chalk");
const logger = console.log;

export const info = (msg) => {
  logger(chalk.cyan(msg));
};
```
