# ghost-mysql

Ghost setup with MySQL as database and a custom config

When you setup Ghost with docker-compose, why not go straight for MySQL as
database. Docker-compose makes it easy to start up multiple virtual machines.

The setup can be configured by changing the [.env](.env)-file or setting 
corresponding environment variables.

## Prerequisites

[Træfik as reverse-proxy](https://github.com/docker-compose-examples/reverse-proxy)
should run on the same host (if Ghost is used in `production`-mode

* [ghost](ghost/): Runs Ghost (derived from https://hub.docker.com/_/ghost/)
* [mysql](mysql/): Runs MySQL (derived from https://hub.docker.com/_/mysql/)
* [npm_install](npm_install/): Runs 'npm install' in a [NodeJS](https://hub.docker.com/_/node/) container

## Usage

* Edit the [.env](.env) file and adjust your settings (**change the passwords**)
* Edit the file [ghost/config.js](ghost/config.js) if needed.

Run Ghost in development-mode: 

* `NODE_ENV=development docker-compose up -d` in the project root
* In the log output, look to the string "Configuring development url for Ghost as:"
* Open the URL next to string.
* Stop everything: `docker-compose down` in the project root

Run ghost

* `docker-compose up -d`  in the project root
* Open the admin-app (https://BLOG_DOMAIN/ghost) to initialize your blog. 
* Stop everything: `docker-compose down` in the project root
 
## Ghost

The file [docker-entrypoint.sh](ghost/docker-entrypoint.sh) is derived 
from the entry-point of the official image. It is modified so that the 
provided [config.js](ghost/config.js) is not overwritten by the config-
example. All configuration for your blog should go into this file.
**The mail configuration is NOT provided in there.** PR for reasonable
defaults appreciated.

The provided config file, takes the MySQL-password and the blog-domain
from the [.env](.env)-file.

By default Ghost is run in `production`-mode. If you run it in 
`development`-mode, the ipv4-address of the `eth0` device will be 
used as blog-url. You should be able to access it if you are running
docker on your own machine (at least I am).

 
## MySQL

A [custom config file](mysql/my.cnf) is provided so that MySQL listens
not only on localhost, but also on the default "network". This is 
necessary for Ghost to connect to MySQL. Root-password, database-user
and user-password are provided throught environment-variables as 
described in [the documentation of the image](https://hub.docker.com/_/mysql/). 

## npm_install (or "custom themes")

If you want to install a Ghost theme via npm or github, you can add
a dependency to the [package.json](package.json) by running for example
`npm install --save Zazama/GoClean` setting 
`CUSTOM_THEME_DIR=node_modules/GoClean` in `.env`.

The `npm_install`-container will run `npm install` in the official
[NodeJS](https://hub.docker.com/_/node). The `entrypoint`-script has
been changed so that the process runs with user and group of the project 
directory.

