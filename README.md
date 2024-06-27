# Nuance.js Functions

A package of everyday, JavaScript / TypeScript functions that will save you time when used.

This package was made with intent to simplify the development experience by sourcing basic functions,
to keep your codebase clean.

## Installation
```
yarn add nuancejs
# or
npm install nuancejs --save
```

### **Example Usage**
```TypeScript
import { randomInRange } from "nuancejs"; // if you're using ES6 modules
const { randomInRange } = require("nuancejs");

const randomNum = randomInRange({
  min: 0,
  max: 10,
  // other properties if needed
});

// You can also do as such:
import * as Nuance from "nuancejs";
const randomNum = Nuance.randomInRange({...});
```

**You can find documentation for this library over at [nuancejs.org](https://nuancejs.org)**

## Licence
MIT
