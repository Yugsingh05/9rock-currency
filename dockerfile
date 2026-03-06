FROM oven/bun:1.2.22-alpine

WORKDIR /app

COPY package.json .

COPY bun.lock .

RUN bun install --frozen-lockfile

COPY . .

CMD ["bun", "run", "start"]
