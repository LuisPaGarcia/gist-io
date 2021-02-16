const { Octokit } = require("@octokit/core");

class GistDB {
  #gistId;
  #filename;
  constructor(token, gistId, filename) {
    this.octokit = new Octokit({
      auth: token,
    });
    this.#gistId = gistId;
    this.#filename = filename;
  }

  request(query, config) {
    return this.octokit.request(query, config);
  }

  async create(filename, content) {
    try {
      const response = await this.request("POST /gists", {
        files: {
          [filename]: {
            content: JSON.stringify(content),
          },
        },
        public: false,
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  getGist(gistId) {
    try {
      return this.request("GET /gists/{gist_id}", {
        gist_id: gistId,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async get(gistId, filename) {
    try {
      const response = await this.getGist(gistId);
      try {
        return JSON.parse(response.data.files[filename].content);
      } catch (error) {
        return response.data.files[filename].content;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getFileList(gistId) {
    try {
      const response = await this.getGist(gistId);
      return Object.keys(response.data.files);
    } catch (error) {
      throw new Error(error);
    }
  }
}
module.exports = GistDB;
