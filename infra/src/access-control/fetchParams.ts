import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";

/**
 * ハンドラ外領域にキャッシュする
 */
let memo: {
  userPoolId: string;
  userPoolAppId: string;
  userPoolDomain: string;
} | null = null;

/**
 * Lambda@Edge では環境変数が取得できないので SSM Parameter Store から取得
 */
export const fetchParams = async (prefix: string) => {
  if (memo) return memo;

  const ssmClient = new SSMClient({
    region: "us-east-1",
  });

  // NOTE: GetParameters は順序が保証されないので使用しない
  const [
    {
      Parameter: { Value: userPoolId },
    },
    {
      Parameter: { Value: userPoolAppId },
    },
    {
      Parameter: { Value: userPoolDomain },
    },
  ] = await Promise.all([
    ssmClient.send(
      new GetParameterCommand({
        Name: `/${prefix}/user-pool-id`,
      }),
    ),
    ssmClient.send(
      new GetParameterCommand({
        Name: `/${prefix}/user-pool-client-id`,
      }),
    ),
    ssmClient.send(
      new GetParameterCommand({
        Name: `/${prefix}/user-pool-domain`,
      }),
    ),
  ]);

  return memo = { userPoolId, userPoolAppId, userPoolDomain };
};
