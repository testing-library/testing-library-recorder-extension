# Testing Library Recorder Extension

Testing Library Extension for Chrome DevTools Recorder

## Installation

1. Clone the repo
2. `npm install`
3. Visit `chrome://extensions`
4. Enable `Developer mode` via toggle switch in upper right corner
5. Click `Load unpacked` button in upper left corner
6. Select the `dist` directory

## Usage

1. Create a new recording via the Recorder panel.
2. Hover over the export icon
3. Click `Export as a Testing Library script`
4. Save file as `{testName}.test.{ts,js}`
5. Install `jest`, `jest-environment-jsdom`, and `jest-environment-url`
6. Run tests with `jest`

## Inspiration

- [Puppeteer Replay examples](https://github.com/puppeteer/replay/tree/main/examples)
