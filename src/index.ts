import { Octokit } from "@octokit/core";
import { OctokitResponse } from "@octokit/types";
import {
  GistIORequest,
  GistIOOptions,
  GistIOCreate,
  GistIOGet,
  GistIOPut,
} from "./types/index";
import { Response } from "./interfaces";
/**
 * Class to interact with gists
 */
export class GistDB {
  octokit: Octokit;
  filename?: string;
  gistId?: string;

  constructor(options: GistIOOptions) {
    if (!options.token) {
      throw new Error("token parameter is required.");
    }
    this.octokit = new Octokit({
      auth: options.token,
    });
    this.gistId = options.gistId;
    this.filename = options.filename;
  }

  request({ query, config }: GistIORequest) {
    return this.octokit.request(query, config);
  }
  /**
   * Create a new gist based in a filename and the content.
   * @param filename name of the file to create
   * @param content content of the file to attach to the new gist
   * @returns {object} return the info of the action
   */
  async create({ filename, content }: GistIOCreate) {
    try {
      const response = await this.request({
        query: "POST /gists",
        config: {
          files: {
            [filename]: {
              content: JSON.stringify(content),
            },
          },
          public: false,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  getGist(gistId: string) {
    try {
      return this.request({
        query: "GET /gists/{gist_id}",
        config: {
          gist_id: gistId,
        },
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
  async get({ gistId, filename }: GistIOGet): Promise<Response> {
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
   * Function to patch a gist
   * @param gistId id of the gist
   * @param filename name of the file to edit
   * @param content file content
   * @return {Promise<any, number>} response based in request
   */
  async put({
    gistId,
    filename,
    content,
  }: GistIOPut): Promise<OctokitResponse<any, number>> {
    try {
      const config = {
        gist_id: gistId,
        files: {
          [filename]: {
            content: (function () {
              try {
                return JSON.stringify(content);
              } catch (e) {
                return content;
              }
            })(),
          },
        },
      };
      return await this.request({
        query: "PATCH /gists/{gist_id}",
        config,
      });
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
