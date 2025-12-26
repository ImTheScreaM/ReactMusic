import 'dotenv/config';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { PrismaClient } from './generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import express from 'express';
import cors from 'cors';
import {
    create_session,
    deleted_session,
    get_session,
} from './prisma/actions/session.ts';

import cookieParser from 'cookie-parser';

import validate from './middleware/middleware.js';

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
        credentials: true,
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cookie',
            'Set-Cookie',
        ],
        exposedHeaders: ['Set-Cookie'],
    })
);
app.use(cookieParser());

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const redirect = app.route();

const registerSchema = z.object({
    name: z.string().min(8),
    password: z.string().min(12),
    email: z.string().email(),
});

const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(9, 'Pls write pass with 9 symbol'),
});

app.post('/register', validate(registerSchema), async (req, res) => {
    const { name, password, email } = req.body;
    if (!(name && password && email))
        return res.status(400).json({ errors: 'No user,password,email' });

    const userFind = await prisma.user.findUnique({ where: { email: email } });
    if (userFind) return res.status(400).json({ errors: 'user has' });

    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
        data: {
            name: name,
            password: hashPassword,
            email: email,
        },
    });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const userFind = await prisma.user.findUnique({ where: { email: email } });
    const passCheck = await bcrypt.compare(password, userFind.password);

    if (!userFind) {
        return res.status(400).json({ errors: 'no valide data' });
    }

    if (!passCheck) {
        return res.status(400).json({ errors: 'no password' });
    }
    await create_session(userFind.id, res);

    await res.status(200).json({ success: 'Login!', secure: true, path:'/profile' });
});

app.post('/logout', async (req, res) => {
    await deleted_session(res);
    return res.status(200).json({ success: 'logout',path:'/'});
});

app.get('/session', async (req, res) => {
    const session = await get_session(req);

    if (session) {
        return res.status(200).json({
            auth: true,
        });
    }
    await res.status(200).json({
        auth:false,
        path:'/'
    })
});

// app.get("/user",async (req,res) => {

// })

// app.update("/user/:id", async (req, res) => {
//     // ПОТОМ
// });

app.listen(3003, (req, res) => {
    console.log('Сервер запущен на 3003');
});
