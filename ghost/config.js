// # Ghost Configuration
// Setup your Ghost install for various [environments](http://support.ghost.org/config/#about-environments).

// Full documentation can be found at http://support.ghost.org/config/

var devModeUrl = `http://${myIpAddress()}:2368`;

module.exports = {
    // production: Default when started via docker-compose
    production: buildConfig('https://' + process.env.BLOG_DOMAIN),
    // development: URL is one of the network interfaces ip-adress
    development: buildConfig(devModeUrl)
};

if (process.env.NODE_ENV==='development') {
    console.log(`Configuring development url for Ghost as: ${devModeUrl}`)
}

function buildConfig(url) {
    return {
        url: url,
        database: {
            client: 'mysql',
            connection: {
                host: 'mysql',
                user: 'ghost',
                password: process.env.MYSQL_PASSWORD,
                database: 'ghost_db',
                charset: 'utf8'
            }
        },
        server: {
            host: '0.0.0.0',
            port: '2368'
        },
        paths: {
            contentPath: process.env.GHOST_CONTENT
        }
    }
}

/**
 * Get the ipv4-address of the `eth0` device (which should
 * exist in the current docker-setup.
 * @returns {string} the ip-address
 */
function myIpAddress() {
    return require('os')
        .networkInterfaces()
        .eth0
        .filter((iface) => iface.family === 'IPv4')[0]
        .address;
}
