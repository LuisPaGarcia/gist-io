import { Octokit } from "@octokit/core";
import { RequestParameters } from "@octokit/core/dist-types/types";
import Options from "./types/Options";

class GistDB {
  octokit: Octokit;
  filename?: string;
  gistId?: string;

  constructor(options: Options) {
    if (!options.token) {
      throw new Error("token parameter is required.");
    }
    this.octokit = new Octokit({
      auth: options.token,
    });
    this.gistId = options.gistId;
    this.filename = options.filename;
  }

  request(query: string, config: RequestParameters) {
    return this.octokit.request(query, config);
  }

  async create(filename: string, content: Object) {
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

  getGist(gistId: string) {
    try {
      return this.request("GET /gists/{gist_id}", {
        gist_id: gistId,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async get(gistId: string, filename: string) {
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

  async getFileList(gistId: string) {
    try {
      const response = await this.getGist(gistId);
      return Object.keys(response.data.files);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { GistDB };
