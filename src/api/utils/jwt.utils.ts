import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import * as fs from 'fs';

interface PayLoad {
  id: number;
  username: string;
}

export function generateToken(payload: PayLoad) {
  // read private key value
  const privateKey = {
    key: fs.readFileSync('private.key'),
    passphrase: 'jarochatpass'
  };

  const signInOptions: SignOptions = {
    // RS256 uses a public/private key pair. The API provides the private key
    // to generate the JWT. The client gets a public key to validate the
    // signature
    algorithm: 'RS256',
    expiresIn: '1h'
  };

  // generate JWT
  return sign(payload, privateKey, signInOptions);
}

/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */
export function validateToken(token: string): Promise<PayLoad> {
  const publicKey = fs.readFileSync('public.key');

  const verifyOptions: VerifyOptions = {
    algorithms: ['RS256']
  };

  return new Promise((resolve, reject) => {
    verify(token, publicKey, verifyOptions, (error, decoded: PayLoad | any) => {
      if (error) return reject(error);
      resolve(decoded);
    });
  });
}
