# Testing Library Recorder Extension

Testing Library Extension for Chrome DevTools Recorder

## Installation

1. Download and unzip the [latest release](https://github.com/nickmccurdy/testing-library-recorder-extension/releases/latest)
2. Visit `chrome://extensions`
3. Enable `Developer mode` via toggle switch in upper right corner
4. Click `Load unpacked` button in upper left corner
5. Select the `Testing Library Recorder` directory

## Usage

1. Create a new recording via the Recorder panel.
2. Hover over the export icon
3. Click `Export as a Testing Library script`
4. Save file as `{testName}.test.{ts,js}`
5. Install `jest`, `jest-environment-jsdom`, and `jest-environment-url`
6. Run tests with `jest`

## Inspiration

- [Puppeteer Replay examples](https://github.com/puppeteer/replay/tree/main/examples)
