#!/bin/sh -l

BROWSER="$1"

echo "Installing packages..."
yarn

echo "Running tests on $BROWSER..."
HOME=/root yarn test --browser=$BROWSER

