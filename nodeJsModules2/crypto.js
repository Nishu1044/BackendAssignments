
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');


const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

const encryptedText = encrypt('hello good morning');
console.log('Encrypted Text:', encryptedText);

const randomUUID = uuidv4();
console.log('Random UUID:', randomUUID);
