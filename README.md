# Photoshop TypeScript Client

A modern, TypeScript-based client for communicating with Adobe Photoshop using a custom wire protocol.
This package refactors and modernizes the original [generator-core](https://github.com/adobe-photoshop/generator-core)
library from Adobe, making it easier to use with strong typing, async/await support, and adherence to the latest Node.js practices.

## Project Overview

This package provides a clean and modern interface for interacting with Adobe Photoshop. Built with TypeScript,
it ensures type safety and a better developer experience. Key features include:

- **Strong Typing:** All interactions with the Photoshop client are strongly typed, helping developers catch errors at compile time.
- **Async/Await:** Utilizes async/await for handling asynchronous operations, making the code easier to read and maintain.
- **Modern Node.js Support:** Designed to work seamlessly with the latest versions of Node.js, avoiding deprecated APIs and practices.

## Installation

To install the package, use npm or yarn:

```bash
npm install --save photoshop-client
```

## Basic Usage

```typescript
import { createClient, MessageType } from 'photoshop-client'

const client = createClient({ hostname: '127.0.0.1', port: 49494 })

client.connect().then(() => {
  const commandId = client.sendCommand('app.activeDocument.close()', MessageType.JAVASCRIPT)
  console.log(`Command sent with ID: ${commandId}`)
})
```

## License

This project is licensed under the MIT License.


## Acknowledgements

This project was inspired by the original [generator-core](https://github.com/adobe-photoshop/generator-core) project by Adobe Systems Incorporated. While this code is a complete rewrite, it builds on the concepts and protocols introduced by the original library.
