# Dockerfile for Angular frontend
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json
COPY front/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY front/ .

# Build the Angular app
RUN ng build

# Serve the application with Nginx
FROM nginx:alpine

# Copy built Angular app to Nginx's public folder
COPY --from=build /app/dist/front /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
