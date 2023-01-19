import {readFile} from 'fs/promises'
import {join} from 'path'
import RecorderPlugin from '../RecorderPlugin'
import flow from '../flow'

test('stringify', async () => {
  expect(await new RecorderPlugin().stringify(flow)).toBe(
    await readFile(join(__dirname, 'fixtures/example.js'), 'utf8'),
  )
})

test('stringifyStep', async () => {
  expect(await new RecorderPlugin().stringifyStep(flow.steps[1])).toBe(
    "await waitFor(() => screen.getByText('More information...'))\n",
  )
})
