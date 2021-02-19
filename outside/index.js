const { GistDB } = require("../lib/index");

const db = new GistDB({
  token: "",
});

(async function () {
  const response = await db.getFileList("");
  console.log(response);
})();
