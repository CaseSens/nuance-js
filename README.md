# Nuance.js

[![npm version](https://badge.fury.io/js/nuancejs.svg)](https://www.npmjs.com/package/nuancejs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Code faster and cleaner without the need for boilerplate code. A fast, ultra-lightweight JavaScript/TypeScript utility library to kickstart production.

## About Nuance.js

Nuance.js is a lightweight TypeScript utility library inspired by Lodash, meticulously designed for a seamless and type-safe experience across both TypeScript and JavaScript environments. It empowers developers with robust runtime checks for enhanced safety and introduces a novel, developer-readable, and accessible API that makes your code cleaner and more intuitive.

## Installation

<details open><summary>NPM</summary>
  
```console
npm install nuancejs
```
  
</details>

<details><summary>PNPM</summary>
  
```console
pnpm add nuancejs
```
  
</details>

<details><summary>yarn</summary>
  
```console
yarn add nuancejs
```
  
</details>

## Introduction

Welcome to Nuance.js! This simple and easy-to-use library is crafted to save you time and make your code more elegant and understandable.

Nuance.js provides those essential, often-needed utility functions that aren't natively available in the standard JavaScript API, allowing you to focus on building features rather than re-implementing common logic.

## Why Nuance.js? A Simple Example

Let's consider a common scenario: generating a random number within a specific range. In standard JavaScript, achieving this for a range like 10-20 (inclusive) requires a somewhat cumbersome formula:

```ts
Math.floor(Math.random() * (20 - 10 + 1) + 10);
```

This approach, while functional, is not immediately intuitive and can become problematic if you need to adjust parameters like inclusivity later on.

With Nuance.js, the same task becomes dead simple and remarkably readable using the randomInRange function:

```ts
import { randomInRange } from "nuance-js";

randomInRange({ min: 10, max: 20 });
```

Not only is this visually cleaner, but its English-like syntax immediately conveys its purpose to anyone reading your code.
This function, by default, generates a random integer between 10 and 20 (inclusive of both min and max),
with options to further customize its behavior.

```ts
import { randomInRange } from "nuance-js";

const randomNumWithOptions = randomInRange({
  min: 0,
  max: 10,
  inclusive: "false false",
  containsDecimals: true,
});
```
