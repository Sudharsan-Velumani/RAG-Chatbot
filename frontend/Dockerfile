# Use Node.js as the base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copy everything else
COPY . .

# Expose port for Create React App
EXPOSE 3000

# Run the frontend development server
CMD ["npm", "start"]
