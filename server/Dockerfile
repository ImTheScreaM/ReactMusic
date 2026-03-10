FROM node:lts-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm ci
RUN npx prisma generate

COPY ..

CMD ["sh","-c","npm run dev"]
