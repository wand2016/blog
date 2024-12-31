#!/usr/bin/env bash

set -eu

if [ -z "${DOMAIN:-}" ]; then
  echo 'variable DOMAIN is not set.'
  exit 1
fi
if [ -z "${ENVIRONMENT:-}" ]; then
  echo 'variable ENVIRONMENT is not set.'
  exit 1
fi

HOSTED_ZONE_ID=$(aws route53 list-hosted-zones-by-name --dns-name=${DOMAIN} --query=HostedZones[].Id --output=text | cut -d / -f 3)

echo "HOSTED_ZONE_ID is ${HOSTED_ZONE_ID}."

sam build && sam deploy --stack-name=blog-${ENVIRONMENT} \
  --parameter-overrides Environment=${ENVIRONMENT} Domain=${DOMAIN} HostedZoneId=${HOSTED_ZONE_ID}
