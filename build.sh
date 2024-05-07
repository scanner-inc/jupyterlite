#!/bin/bash

set -e

# Building jupyterlite uses a huge amount of NodeJS memory. Allow it to use up
# to 16GB of memory to avoid OOM.
export NODE_OPTIONS="--max_old_space_size=16384"

# Remove build caches to avoid stale code
rm -rf ./build/ ./dist/

yarn install

jlpm bootstrap

jlpm build:prod

doit
