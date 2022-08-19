# Testing Library Recorder Extension

Testing Library Extension for Chrome DevTools Recorder

![Screenshot](https://user-images.githubusercontent.com/927220/185593628-0beda94a-ec08-40a5-9c93-cf9ecb70527e.png)

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

## Supported Chrome Recorder Step Types

| Type                | Output                                                                                               |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| `change`            | `await userEvent.type(element, "value")`                                                             |
| `click`             | `await userEvent.click(element)`                                                                     |
| `click` (right)     | `await userEvent.click(element, { buttons: 2 })`                                                     |
| `hover`             | `await userEvent.hover(element)`                                                                     |
| `doubleClick`       | `await userEvent.dblClick(element)`                                                                  |
| `keyDown`           | `await userEvent.keyboard("{Key>}")`                                                                 |
| `keyUp`             | `await userEvent.keyboard("{/Key}")`                                                                 |
| `navigate`          | `expect(location.href).toBe("https://example.com/")` `expect(document.title).toBe("Example Domain")` |
| `waitForElement`    | `await waitFor(() => element)`                                                                       |
| `waitForExpression` | `await waitFor(() => expression)`                                                                    |

## Inspiration

- [Puppeteer Replay examples](https://github.com/puppeteer/replay/tree/main/examples)
- [Cypress Recorder Extension](https://github.com/cypress-io/cypress-recorder-extension)
