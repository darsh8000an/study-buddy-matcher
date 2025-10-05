# Build stage
FROM node:16-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:16-alpine

WORKDIR /app

# Install serve to run the built app
RUN npm install -g serve

# Copy built files from build stage
COPY --from=build /app/dist ./dist

# Expose port
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000"]
