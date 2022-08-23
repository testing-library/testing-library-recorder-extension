# <img src="octopus.png" alt="Octopus" width="48" height="48"> Testing Library Recorder Extension
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

> Testing Library Extension for Chrome DevTools Recorder

Export tests from the DevTools Recorder panel to Testing Library test scripts using Jest.

Open a recording and click export to use the Testing Library script option.

![Screenshot](https://user-images.githubusercontent.com/927220/185593628-0beda94a-ec08-40a5-9c93-cf9ecb70527e.png)

## Usage

1. Create a new recording via the Recorder panel.
2. Hover over the export icon
3. Click `Export as a Testing Library script`
4. Save file as `{testName}.test.{ts,js}`
5. Install dependencies
   ```
   npm install --save-dev jest jest-environment-jsdom jest-environment-url @testing-library/dom @testing-library/user-event @testing-library/jest-dom
   ```
   ```
   yarn add --dev jest jest-environment-jsdom jest-environment-url @testing-library/dom @testing-library/user-event @testing-library/jest-dom
   ```
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
| `navigate` \*       | `expect(location.href).toBe("https://example.com/")` `expect(document.title).toBe("Example Domain")` |
| `waitForElement`    | `await waitFor(() => element)`                                                                       |
| `waitForExpression` | `await waitFor(() => expression)`                                                                    |

\* Only one `navigate` step is allowed per test because `jest-environment-url` must load pages since `jsdom` does not support navigation. Without any `navigate` steps, you'll need to edit your test to manually load the DOM.

## Example

### Recording

```json
{
  "title": "Example",
  "steps": [
    {
      "type": "navigate",
      "url": "https://example.com/",
      "assertedEvents": [
        {
          "type": "navigation",
          "url": "https://example.com/",
          "title": "Example Domain"
        }
      ]
    },
    {
      "type": "waitForElement",
      "selectors": [
        ["aria/More information..."],
        ["body > div > p:nth-child(3) > a"]
      ]
    }
  ]
}
```

### Test Output

```js
/**
 * @jest-environment url
 * @jest-environment-options { "url": "https://example.com/" }
 */
const { screen, waitFor } = require("@testing-library/dom")
const { default: userEvent } = require("@testing-library/user-event")
require("@testing-library/jest-dom")

test("Example", async () => {
  expect(location.href).toBe("https://example.com/")
  expect(document.title).toBe("Example Domain")
  await waitFor(() => screen.getByText("More information..."))
})
```

## Inspiration

- [Puppeteer Replay examples](https://github.com/puppeteer/replay/tree/main/examples)
- [Cypress Recorder Extension](https://github.com/cypress-io/cypress-recorder-extension)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://nickmccurdy.com/"><img src="https://avatars.githubusercontent.com/u/927220?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nick McCurdy</b></sub></a><br /><a href="https://github.com/testing-library/testing-library-recorder-extension/commits?author=nickmccurdy" title="Code">💻</a></td>
    <td align="center"><a href="https://jec.fyi/"><img src="https://avatars.githubusercontent.com/u/5917927?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jecelyn Yeen</b></sub></a><br /><a href="https://github.com/testing-library/testing-library-recorder-extension/commits?author=jecfish" title="Code">💻</a> <a href="https://github.com/testing-library/testing-library-recorder-extension/issues?q=author%3Ajecfish" title="Bug reports">🐛</a> <a href="https://github.com/testing-library/testing-library-recorder-extension/commits?author=jecfish" title="Documentation">📖</a> <a href="#ideas-jecfish" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-jecfish" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-jecfish" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!