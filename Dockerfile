# Use official Node.js image as base
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the Fastify application will run on
EXPOSE 3000

# Command to run the Fastify application
CMD ["npm", "run", "dev"]
