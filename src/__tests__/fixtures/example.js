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
