FROM node:20-alpine

# Build the shared library first (same as auth-service and profile-service)
WORKDIR /usr/src/auth-shared
COPY auth-shared/ .
RUN npm install && npm run build

WORKDIR /usr/src/app

# Copy ONLY package files first
COPY game-service/package*.json ./

# Install ALL dependencies
RUN npm install

# Copy the actual code (Ensure .dockerignore has node_modules!)
COPY game-service/. .

# Inject the shared library using a symbolic link (Force it with -sf)
RUN mkdir -p node_modules/@game && \
    ln -sf /usr/src/auth-shared ./node_modules/@game/auth-shared

# Prisma and Build
# Ensure we generate the Prisma client before building the NestJS app
#RUN npx prisma generate || echo "No Prisma schema found"

RUN npm run build

EXPOSE 3002
ENTRYPOINT ["npm", "run", "start:prod"]
