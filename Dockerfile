FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Jalankan generate + migrate + start sekaligus
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node index.js"]