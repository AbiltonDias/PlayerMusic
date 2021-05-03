require('dotenv').config()

module.exports = {
    images: {
        domains: ['storage.googleapis.com']
    },
    env: {
        API_URL: process.env.API_URL
    },
};