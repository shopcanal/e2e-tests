#!/bin/sh -l

BROWSER="$1"
SHARD="$2"

echo "Installing packages..."
yarn

echo "Running tests on $BROWSER (shard $SHARD)..."
HOME=/root DEBUG=pw:api,pw:browser yarn test --project=$BROWSER --shard=$SHARD

