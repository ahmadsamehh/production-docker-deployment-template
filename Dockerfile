FROM node:22-bookworm-slim
WORKDIR /app
COPY package.json index.js ./
RUN npm install
CMD ["node", "index.js"]