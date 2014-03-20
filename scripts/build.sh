#!/usr/bin/env bash
ELLOG_HEADING="nodengine"
source ~/bin/bash/ellog.bash

ellog_info "build" "stylesheet"
lessc style.less > ./public/css/style.css

ellog_info "build" "jade"
jade ./views/index.jade -o .
