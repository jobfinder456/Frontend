FROM node
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . .
EXPOSE 5173
ENTRYPOINT [ "npm", "run", "dev" ]