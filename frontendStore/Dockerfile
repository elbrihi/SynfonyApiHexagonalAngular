FROM node:19.6.0

ARG WORK_DIR=/frontendStore
ENV PATH=${WORK_DIR}/node_modules/.bin:$PATH
RUN mkdir ${WORK_DIR}
WORKDIR ${WORK_DIR}

COPY package.json ${WORK_DIR}
COPY package-lock.json ${WORK_DIR}

RUN npm install -g @angular/core@16.2.4 @angular/cli@16.2.4 --force
RUN npm install

COPY . ${WORK_DIR}

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
