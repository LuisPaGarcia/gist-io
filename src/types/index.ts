import { RequestParameters } from "@octokit/core/dist-types/types";

export type GistIOOptions = {
  token: string;
  gistId?: string;
  filename?: string;
  username?: string;
};

export type GistIORequest = {
  query: string;
  config: RequestParameters;
};

export type GistIOCreate = {
  filename: string;
  content: object;
};

export type GistIOGet = {
  gistId: string;
  filename: string;
};

export type GistIOPut = {
  gistId: string;
  filename: string;
  content: unknown;
};
