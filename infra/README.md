# infra

AWS にデプロイするためのインフラ一式です。

## デプロイ

```shell
# staging
ENVIRONMENT=stg DOMAIN=xxx ./deploy.sh

# production
ENVIRONMENT=prd DOMAIN=xxx ./deploy.sh
```

- stg は `stg.$DOMAIN` ドメインにデプロイされます。
- stg 環境のみ [cognito-at-edge](https://github.com/awslabs/cognito-at-edge) で認証をかけています。
