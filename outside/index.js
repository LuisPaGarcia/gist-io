const { GistDB } = require("../dist/main");

const db = new GistDB({
  token: "",
});

(async function () {
  const response = await db.getFileList("");
  console.log(response);
})();
