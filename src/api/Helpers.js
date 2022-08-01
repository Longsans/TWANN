import { HEADERS } from "../utils/constants";

export const addHeadersForAuthenticatedPostPutFetch = (token, request) => {
  const result = addTokenHeaderForFetch(token, request);
  result.headers[HEADERS.contentType] = HEADERS.values.appJson;
  return result;
};

export const addTokenHeaderForFetch = (token, request) => {
  const bearerToken = HEADERS.templates.Bearer(token);
  if (request?.headers) {
    const result = request;
    result.headers[HEADERS.authZ] = bearerToken;
    return result;
  }
  return {
    headers: {
      [HEADERS.authZ]: bearerToken,
    },
    ...request,
  };
};
