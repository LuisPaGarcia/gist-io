var assert = require("assert");
const ClassGist = require("../src");
const GITHUB_TOKEN = "687dd073703ed9279ea1e83f6e88629917e6772f";
const GITHUB_USER = "luispagarcia";
const GistDB = new ClassGist({ token: GITHUB_TOKEN, username: GITHUB_USER });

describe("Connect", function () {
  it("Should connect return the list of available gist for the user", async function () {
    const paged = await GistDB.paged();
    assert.equal(Array.isArray(paged), true);
  });
});
