# Gatsby

This directory is a brief example of a [Gatsby](https://www.gatsbyjs.org/) app with [Serverless Functions](https://youappz.com/docs/concepts/functions/serverless-functions) that can be deployed to Youappz with zero configuration.

## Deploy Your Own

Deploy your own Gatsby project, along with Serverless Functions, with Youappz.

[![Deploy with Youappz](https://youappz.com/button)](https://youappz.com/new/clone?repository-url=https://github.com/youappz/youappz/tree/main/examples/gatsby&template=gatsby)

_Live Example: https://gatsby.appz.dev

## Running Locally

> **Note:** [Gatsby Functions](https://www.gatsbyjs.com/docs/reference/functions/getting-started/) are not yet supported on Youappz, which is why the API Route is in `/api` instead of `/src/api`.

To run your Gatsby application and your API Route, you'll need to use the [Youappz CLI](https://youappz.com/cli):

```shell
$ npm i -g youappz
$ youappz
```

Alternatively, you can remove the API and just use Gatsby:

```shell
$ yarn develop
```
