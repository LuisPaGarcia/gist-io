// response.data.files[filename].content

interface Content {
  content: string;
}

interface Files {
  [key: string]: Content;
}

interface Data {
  data: Files;
}

export interface Response {
  response: Data;
}
