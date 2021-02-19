import { Octokit } from "@octokit/core";
import { RequestParameters } from "@octokit/core/dist-types/types";
import Options from "./types/Options";
import { Response } from "./interfaces";
/**
 * Class to interact with gists
 */
export class GistDB {
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
  /**
   * Create a new gist based in a filename and the content.
   * @param filename name of the file to create
   * @param content content of the file to attach to the new gist
   * @returns {object} return the info of the action
   */
  async create(filename: string, content: object) {
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

  /**
   * To get the content of a gist, based in id and filename
   * @param gistId id of the gist
   * @param filename name of the file inside the gist
   * @return {Promise<string | object>} File content
   */
  async get(gistId: string, filename: string): Promise<Response> {
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

  /**
   * To get the list of files inside a gist
   * @param gistId id of the gist
   */
  async getFileList(gistId: string): Promise<Array<string>> {
    try {
      const response = await this.getGist(gistId);
      return Object.keys(response.data.files);
    } catch (error) {
      throw new Error(error);
    }
  }
}
