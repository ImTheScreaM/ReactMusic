import { SignJWT, jwtVerify } from 'jose';

const SECRET_CODE = 'SECRET_CODE';
const encodedKey = new TextEncoder().encode(SECRET_CODE);

type SessionPayload = {
    userId: number;
    expiresAt: Date;
};

export const create_session = async (userId: number, res) => {
    const expiresAt = new Date(Date.now() + 7 * 60 * 60 * 60 * 24 + 1000);
    const session = await encrypt({ userId, expiresAt });
    res.cookie('session', session, {
        httpOnly: true,
        expires: expiresAt,
    });
    return session;
};

export const encrypt = async (payload: SessionPayload) => {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
};

export const decrypt = async (sessionToken: string) => {
  if(sessionToken) {
    try {
      const {payload} = await jwtVerify(sessionToken,encodedKey, {
        algorithms:["HS256"]
      })
      return payload
    } catch(error) {
      console.log("decrypt",error)
    }
  } else {
    console.log("no data")
  }
};

export const get_session = async (req, res) => {
    const sessionToken = req.cookies?.session;

    return await decrypt(sessionToken);
};

export const deleted_session = async (res: any) => {
    try {
        res.clearCookie('session', {
            httpOnly: true
        });
    } catch (err) {
        console.log('err deleted', err);
    }
};
