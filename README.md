<div align="center">
<h1>Testing Library Recorder Extension</h1>

<a href="https://joypixels.com/profiles/emoji/1f419">
  <img
    height="80"
    width="80"
    alt="octopus"
    src="other/octopus.png"
  />
</a>

<p>Testing Library Extension for Chrome DevTools Recorder</p>
</div>

---

<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][extension]
[![downloads][downloads-badge]][extension]
[![MIT License][license-badge]][license]
[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]
[![Discord][discord-badge]][discord]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]
<!-- prettier-ignore-end -->

Export tests from the DevTools Recorder panel to Testing Library test scripts
using Jest.

Open a recording and click export to use the Testing Library script option.

![Screenshot](https://user-images.githubusercontent.com/927220/185593628-0beda94a-ec08-40a5-9c93-cf9ecb70527e.png)

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Usage](#usage)
  - [Troubleshooting](#troubleshooting)
- [Supported Chrome Recorder Step Types](#supported-chrome-recorder-step-types)
- [Example](#example)
  - [Recording](#recording)
  - [Test Output](#test-output)
- [Inspiration](#inspiration)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
  - [💡 Feature Requests](#-feature-requests)
  - [❓ Questions](#-questions)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

### [Troubleshooting](https://goo.gle/devtools-recorder-reference#extension-troubleshooting)

## Supported Chrome Recorder Step Types

| Type                | Output                                                                                               |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| `change`            | `await userEvent.type(element, 'value')`                                                             |
| `click`             | `await userEvent.click(element)`                                                                     |
| `click` (right)     | `await userEvent.click(element, {buttons: 2})`                                                       |
| `hover`             | `await userEvent.hover(element)`                                                                     |
| `doubleClick`       | `await userEvent.dblClick(element)`                                                                  |
| `keyDown`           | `await userEvent.keyboard('{Key>}')`                                                                 |
| `keyUp`             | `await userEvent.keyboard('{/Key}')`                                                                 |
| `navigate` \*       | `expect(location.href).toBe('https://example.com/')` `expect(document.title).toBe('Example Domain')` |
| `waitForElement`    | `await waitFor(() => element)`                                                                       |
| `waitForExpression` | `await waitFor(() => expression)`                                                                    |

\* Only one `navigate` step is allowed per test because `jest-environment-url`
must load pages since `jsdom` does not support navigation. Without any
`navigate` steps, you'll need to edit your test to manually load the DOM.

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
const {screen, waitFor} = require('@testing-library/dom')
const {default: userEvent} = require('@testing-library/user-event')
require('@testing-library/jest-dom')

test('Example', async () => {
  expect(location.href).toBe('https://example.com/')
  expect(document.title).toBe('Example Domain')
  await waitFor(() => screen.getByText('More information...'))
})
```

## Inspiration

- [Puppeteer Replay examples](https://github.com/puppeteer/replay/tree/main/examples)
- [Cypress Recorder Extension](https://github.com/cypress-io/cypress-recorder-extension)

## Issues

Looking to contribute? Look for the [Good First Issue][good-first-issue] label.

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**][bugs]

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

[**See Feature Requests**][requests]

### ❓ Questions

For questions related to using the library, please visit a support community
instead of filing an issue on GitHub.

- [Discord][discord]
- [Stack Overflow][stackoverflow]

## License

[MIT](LICENSE)

<!-- prettier-ignore-start -->
[build-badge]: https://img.shields.io/github/workflow/status/testing-library/testing-library-recorder-extension/validate?logo=github&style=flat-square
[build]: https://github.com/testing-library/testing-library-recorder-extension/actions?query=workflow%3Avalidate
[coverage-badge]: https://img.shields.io/codecov/c/github/testing-library/testing-library-recorder-extension.svg?style=flat-square
[coverage]: https://codecov.io/github/testing-library/testing-library-recorder-extension
[version-badge]: https://img.shields.io/chrome-web-store/v/pnobfbfcnoeealajjgnpeodbkkhgiici?style=flat-square
[extension]: https://chrome.google.com/webstore/detail/testing-library-recorder/pnobfbfcnoeealajjgnpeodbkkhgiici
[downloads-badge]: https://img.shields.io/chrome-web-store/users/pnobfbfcnoeealajjgnpeodbkkhgiici?style=flat-square
[license-badge]: https://img.shields.io/github/license/testing-library/testing-library-recorder-extension?style=flat-square
[license]: https://github.com/testing-library/testing-library-recorder-extension/blob/main/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: https://makeapullrequest.com
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/testing-library/testing-library-recorder-extension/blob/main/CODE_OF_CONDUCT.md
[bugs]: https://github.com/testing-library/testing-library-recorder-extension/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Acreated-desc+label%3Abug
[requests]: https://github.com/testing-library/testing-library-recorder-extension/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement
[good-first-issue]: https://github.com/testing-library/testing-library-recorder-extension/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement+label%3A%22good+first+issue%22
[github-watch-badge]: https://img.shields.io/github/watchers/testing-library/testing-library-recorder-extension.svg?style=social
[github-watch]: https://github.com/testing-library/testing-library-recorder-extension/watchers
[github-star-badge]: https://img.shields.io/github/stars/testing-library/testing-library-recorder-extension.svg?style=social
[github-star]: https://github.com/testing-library/testing-library-recorder-extension/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20Testing%20Library%20Recorder%20Extension%20by%20%40TestingLib%20https%3A%2F%2Fgithub.com%2Ftesting-library%2Ftesting-library-recorder-extension%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/testing-library/testing-library-recorder-extension.svg?style=social
[discord-badge]: https://img.shields.io/discord/723559267868737556.svg?color=7389D8&labelColor=6A7EC2&logo=discord&logoColor=ffffff&style=flat-square
[discord]: https://discord.gg/testing-library
[stackoverflow]: https://stackoverflow.com/questions/tagged/testing-library
<!-- prettier-ignore-end -->
