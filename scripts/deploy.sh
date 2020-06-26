#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

rm -rf "$DIR"/../build
rm -rf "$DIR"/../deploy
truffle migrate --reset --network network
node "$DIR/deploy_check.js"