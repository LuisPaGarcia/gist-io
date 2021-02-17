import GistDb from "../src";
require("dotenv").config();
const GithubToken: string = process.env.GITHUB_TOKEN || "";

(async function () {
  const gistDb = new GistDb({ token: GithubToken });
})();
