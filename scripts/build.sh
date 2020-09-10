#!/usr/bin/env bash

set -e

yarn clean
mkdir dist
babel src -Dd dist
rm -- dist/**/*.test.js
