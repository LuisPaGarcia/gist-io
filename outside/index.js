const { GistDB } = require("../lib/index");

const db = new GistDB({
  token: "",
});

(async function () {
  db.getFileList("").then((data) => console.log(data));

  const putResult = await db.put({
    gistId: "",
    filename: "example.json",
    content: {
      hello: false,
    },
  });
  console.log(putResult);
})();
