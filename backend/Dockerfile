# Use official Node.js runtime as base image
FROM node:16-alpine

# Set working directory in container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application source code
COPY . .

# Expose port
EXPOSE 5002

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["node", "server.js"]
