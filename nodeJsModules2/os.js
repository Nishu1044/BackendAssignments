

const os = require('os');

const systemDetails = {
    platform: os.platform(), 
    architecture: os.arch(), 
    hostname: os.hostname(), 
    uptime: os.uptime(),
    totalMemory: os.totalmem(), 
    freeMemory: os.freemem(), 
    cpus: os.cpus(), 
    networkInterfaces: os.networkInterfaces(),
    osType: os.type(), 
    osRelease: os.release(),
    userInfo: os.userInfo(), 
};

console.log('Details:', systemDetails);
