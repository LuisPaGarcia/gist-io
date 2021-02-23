# gist-io - A simple way to CRUD a gist.

Use a gist as a place to save non-vital, non-persistent, non-scalable JSON data.

Just a 'lil db.

1. How to install it

```sh
$ npm install gist-io
```

2. How to use it

```javascript
const { GistDB } = require("gist-io");

const db = new GistDB({
  token: "YOUR_GITHUB_TOKEN",
});

db.getFileList("GIST_ID").then((data) => console.log(data));
```

## TODO

- [ ] Recieve a gist ID, and use it from the constructor.
-

Licence MIT
