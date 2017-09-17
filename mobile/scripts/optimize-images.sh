#!/bin/bash

find src -name '*.png' -exec pngcrush -ow {} \;
