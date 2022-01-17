FROM node

COPY . .

RUN npm install

EXPOSE 8000
ENV GENERATE_SOURCEMAP=false

CMD ["npm", "start"]