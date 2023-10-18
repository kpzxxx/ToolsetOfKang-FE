FROM node:16

RUN mkdir -p /app/feword

COPY ./dist /app/feword

WORKDIR /app/feword

EXPOSE 8000

CMD ["npm", "run", "start"]
