import { Authenticator } from "cognito-at-edge";
import type { CloudFrontRequestHandler } from "aws-lambda";
import { fetchParams } from "./fetchParams";

export const handler: CloudFrontRequestHandler = async (request, context) => {
  // NOTE: region が . 区切りでくっついてくるのを除去
  const functionName = context.functionName.split(".").pop();
  const { userPoolId, userPoolAppId, userPoolDomain } =
    await fetchParams(functionName);

  const authenticator = new Authenticator({
    region: "us-east-1",
    userPoolId,
    userPoolAppId,
    userPoolDomain,
    cookiePath: "/",
  });

  return authenticator.handle(request);
};
