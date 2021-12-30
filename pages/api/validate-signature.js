import * as Kilt from "@kiltprotocol/sdk-js";
import { signatureVerify } from "@polkadot/util-crypto";

export default async function handler(req, res) {
  Kilt.config({ address: process.env.NODE_ADDRESS });
  await Kilt.connect();

  const { input, output } = JSON.parse(req.body);

  const didDocument = await Kilt.Did.DefaultResolver.resolveDoc(output.did);
  if (!didDocument) {
    throw new Error("Could not resolve DID");
  }

  const { details } = didDocument;
  const publicKey = details.getKeys(Kilt.KeyRelationship.authentication).pop();
  if (!publicKey) {
    throw new Error("Could not find the key");
  }

  const isValid = signatureVerify(input, output.signature, publicKey.publicKeyHex).isValid === true;

  await Kilt.disconnect();

  res.status(isValid ? 200 : 401).end();
}
