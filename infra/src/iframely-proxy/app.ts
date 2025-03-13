import type { CloudFrontRequestHandler, CloudFrontHeaders } from "aws-lambda";

export const handler: CloudFrontRequestHandler = async (event) => {
  const request = event.Records[0].cf.request;

  if (request.method.toLowerCase() === "get")
    throw new Error(`not supported method ${request.method}`);

  const uri = request.uri.replace("/iframely/", "/");

  const response = await fetch(uri);

  const body = await response.text();
  const headers: CloudFrontHeaders = {};
  response.headers.forEach((value, key) => {
    headers[key] = [{ key, value }];
  });

  // :root { ... } のCSS変数定義に --fbr を加える
  const modifiedBody = body.replace(
    '"css":":root {',
    '"css":":root { --fbr: 0.5rem;',
  );

  return {
    status: String(response.status),
    statusDescription: response.statusText,
    headers,
    body: modifiedBody,
  };
};
