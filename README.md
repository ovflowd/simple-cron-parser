# Simple CRON Parser

This library is a simple CRON schema parser which only supports a hh:mm (Hour and Minutes) format and gives an output in the form of stdOut/console.log of the result of the parsing.

### Libraries Used

- **[Temporal API (Alpha/Polyfill)](https://tc39.es/proposal-temporal/docs/)**
  - This library is used to ensure that the Dates used do not follow any kind of specific TimeZone or Locale.
- **[Zod](https://github.com/colinhacks/zod)**
  - This library is used to ensure that both the response from the HubSpot API and the result that we manually create and send abides the Specification by Parsing and validating it
- **[Microbundle](https://github.com/developit/microbundle)**
  - This is a library that bundles and distributes our Application in UMD, CommonJS, AMD and Module (ES2020) versions.
- **TypeScript**
  - We use TypeScript as the programming language for this Exercise

### The Approach of this Implementation

This approach focus on an elegant and future-proof codebase without extra complications.

Here we rely on Intl.RelativeTimeFormat for human-readable relative times and we use the Temporal API for manipulating DateTimes.

### Installation

The only pre-requisite of this Application is having the [Yarn Package Manager](https://yarnpkg.com/) and Node.js installed.

The package lock was generated targeting Node.js v16 as being the current LTS version. Node.js v14 might work.

To install the dependencies simply run `yarn`.

### Bundling & Running

In order to build this application, simply run `yarn build`.

After building the application you might want to move to run something like

```bash
cat input.txt | node dist/index.js 16:10
```
