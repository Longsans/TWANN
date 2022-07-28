import { HEADERS } from "../utils/constants";

export const addHeadersForAuthenticatedPostPutFetch = (token, req) => {
  const result = addTokenHeaderForFetch(token, req);
  result.headers[HEADERS.contentType] = HEADERS.values.appJson;
  return result;
};

export const addTokenHeaderForFetch = (token, req) => {
  const bearerToken = HEADERS.templates.Bearer(token);
  if (req?.headers) {
    const result = req;
    result.headers[HEADERS.authZ] = bearerToken;
    return result;
  }
  return {
    headers: {
      [HEADERS.authZ]: bearerToken,
    },
    ...req,
  };
};
