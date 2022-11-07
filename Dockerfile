### BASE
FROM amazonlinux:2
ENV WORKDIR /usr/src
WORKDIR $WORKDIR

RUN yum -y groupinstall 'Development Tools'

RUN curl -sL https://rpm.nodesource.com/setup_14.x | bash -
RUN yum install -y nodejs

RUN npm -g install yarn tsup typescript

COPY package.json lerna.json *.lock ./

RUN corepack enable \
    && yarn install \
    && yarn bootstrap
CMD tail -f /dev/null