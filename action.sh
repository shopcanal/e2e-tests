#!/bin/sh -l

BROWSER="$1"

echo "Installing packages..."
yarn

echo "Running tests on $BROWSER..."
yarn test --browser=$BROWSER

