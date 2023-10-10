# Use the Node.js image as the base
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install --legacy-peer-deps

# Copy the entire source code of the project to the working directory
COPY . .

# Build the Next.js project
RUN npm run build

# Expose port 80, which the Next.js application will use
EXPOSE 3000

# Command to start the Next.js server
CMD ["npm", "start"]
