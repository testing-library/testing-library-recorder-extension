/**
 * @jest-environment url
 * @jest-environment-options { "url": "https://example.com/" }
 */
const { screen } = require("@testing-library/dom")
require("@testing-library/jest-dom")

test("Example", () => {
  expect(location.href).toBe("https://example.com/")
  expect(screen.getByText("Example Domain")).toBeInTheDocument()
})
