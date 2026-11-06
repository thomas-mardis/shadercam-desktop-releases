// Publisher automation only; no application source or signing material is public.
const fs = require('node:fs');
const crypto = require('node:crypto');
const path = require('node:path');
const directory = process.argv[2];
const seed = Buffer.from((process.env.FEED_KEY || '').trim(), 'base64');
if (seed.length !== 32) throw new Error('A 32-byte signing seed is required');
const key = crypto.createPrivateKey({
  key: Buffer.concat([Buffer.from('302e020100300506032b657004220420', 'hex'), seed]),
  format: 'der', type: 'pkcs8'
});
const publicDer = crypto.createPublicKey(key).export({format: 'der', type: 'spki'});
const expected = fs.readFileSync(path.join(__dirname, 'release-public-key.txt'), 'utf8').trim();
if (publicDer.subarray(-32).toString('base64') !== expected) throw new Error('Publisher key mismatch');
const feed = JSON.parse(fs.readFileSync(path.join(directory, 'releases.preview.json'), 'utf8'));
if (!Array.isArray(feed.Assets) || !feed.Assets.length) throw new Error('Empty release feed');
for (const asset of feed.Assets) {
  if (asset.PackageId !== 'ShaderCam.Desktop.Preview'
      || !/^[A-Za-z0-9_-][A-Za-z0-9._-]*$/.test(asset.FileName)
      || !/^[a-fA-F0-9]{64}$/.test(asset.SHA256) || !(asset.Size > 0)) {
    throw new Error('Unexpected release asset');
  }
}
const envelope = {schema: 1, app_id: 'ShaderCam.Desktop.Preview', channel: 'preview',
  expires_unix: Math.floor(Date.now() / 1000) + 14 * 86400, feed};
const bytes = Buffer.from(JSON.stringify(envelope, null, 2));
const signature = crypto.sign(null, bytes, key);
if (!crypto.verify(null, bytes, crypto.createPublicKey(key), signature)) throw new Error('Signature self-check failed');
fs.writeFileSync(path.join(directory, 'shadercam.preview.json'), bytes);
fs.writeFileSync(path.join(directory, 'shadercam.preview.json.sig'), signature.toString('base64'));
console.log('Renewed signed preview metadata');
