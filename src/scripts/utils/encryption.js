// encryption.js
// Funciones para encriptar usando Web Crypto y clave pública PEM

export function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

export function ab2str(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

export async function importRsaKey(pem) {
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";
    const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length - 1);
    const binaryDerString = window.atob(pemContents);
    const binaryDer = str2ab(binaryDerString);
    return window.crypto.subtle.importKey("spki", binaryDer, {
        name: "RSA-OAEP",
        hash: "SHA-256",
    }, true, ["encrypt"]);
}

export async function encryptWithPublicKey(data, pemKey) {
    const enc = new TextEncoder();
    const publicKey = await importRsaKey(pemKey);
    const result = await window.crypto.subtle.encrypt({
        name: "RSA-OAEP",
    }, publicKey, enc.encode(data));
    return ab2str(result);
}
