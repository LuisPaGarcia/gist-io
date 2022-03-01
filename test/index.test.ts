import assert from "assert";
import ClassGist from "../src/index";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const GITHUB_USER = process.env.GITHUB_USER || "";

const GistDB = new ClassGist({
  token: GITHUB_TOKEN,
  username: GITHUB_USER,
});

describe("Connect", function () {
  it("Should connect return the list of available gist for the user", async function () {
    const paged = await GistDB.getFileList('');
    assert.equal(Array.isArray(paged), true);
  });
});
