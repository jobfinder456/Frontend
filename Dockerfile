FROM node
WORKDIR /app
COPY package.json /app/
RUN npm install --production
COPY . .
RUN npm run build 
ENTRYPOINT [ "npm", "run" ]