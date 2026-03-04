
FROM node:20-slim

# Build the shared library first (same as auth-service)
WORKDIR /usr/src/auth-shared
COPY auth-shared/ .
RUN npm install && npm run build

# Set up the profile-service app
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY profile-service/package*.json ./
RUN npm install

# Copy the service source code
COPY profile-service/. .

# Inject the shared library using a symbolic link (Force it with -sf)
RUN mkdir -p node_modules/@game && \
    ln -sf /usr/src/auth-shared ./node_modules/@game/auth-shared

# Prisma and Build
# Ensure we generate the Prisma client before building the NestJS app
RUN npx prisma generate || echo "No Prisma schema found"
RUN npm run build

EXPOSE 3001

ENTRYPOINT ["npm", "run", "start:prod"]