import { SignJWT, jwtVerify } from 'jose';

const SECRET_CODE = 'SECRET_CODE';
const encodedKey = new TextEncoder().encode(SECRET_CODE);

type SessionPayload = {
    userId: number;
    expiresAt: Date;
};

export const create_session = async (userId: number, res) => {
    const expiresAt = new Date(Date.now() + 7 * 60 * 60 * 1000);
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
    try {
        const { payload } = await jwtVerify(sessionToken, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        console.log('error', error);
    }
};

export const get_session = async (req, res) => {
    const sessionToken = req.cookies?.session;

    if (!sessionToken) {
        console.log('Error');
    }

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
