# Salesforce CLI Prettier Plugin

**THIS IS JUST A SAMPLE PLUGIN, IT IS NOT OFFICIALLY SUPPORTED.**

Adds a hook that uses prettier to format code pulled or retrieved from an org.

[![Version](https://img.shields.io/npm/v/sfdx-plugin-prettier.svg)](https://npmjs.org/package/sfdx-plugin-prettier)
[![CircleCI](https://circleci.com/gh/forcedotcom/sfdx-plugin-prettier/tree/main.svg?style=shield)](https://circleci.com/gh/forcedotcom/sfdx-plugin-prettier/tree/main)
[![Codecov](https://codecov.io/gh/forcedotcom/sfdx-plugin-prettier/branch/main/graph/badge.svg)](https://codecov.io/gh/forcedotcom/sfdx-plugin-prettier)
[![Known Vulnerabilities](https://snyk.io/test/github/forcedotcom/sfdx-plugin-prettier/badge.svg)](https://snyk.io/test/github/forcedotcom/sfdx-plugin-prettier)
[![License](https://img.shields.io/npm/l/sfdx-plugin-prettier.svg)](https://github.com/forcedotcom/sfdx-plugin-prettier/blob/main/package.json)

Install by running:

```sh-session
$ sfdx plugin:install sfdx-plugin-prettier
```

The plugin will run and automatically format your code with [Prettier](https://prettier.io) every time you run `source:fource:pull` or `source:force:retrieve`.
