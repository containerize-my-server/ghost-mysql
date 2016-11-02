#!/bin/bash -x

# Inspired by: http://www.yegor256.com/2014/08/29/docker-non-root.html
# Find out, who owns the current project directory,
# create this user and group in the docker-container
# run the command as this user.
addgroup --gid="$( stat -c "%g" . )" user
adduser --uid="$( stat -c "%u" .)" --ingroup=user --disabled-password --gecos '' user
HOME=/home/user su -m user -c "$*"