import {readFile} from 'fs/promises'
import {join} from 'path'
import type {Step, UserFlow} from '@puppeteer/replay'
import RecorderPlugin from '../RecorderPlugin'
import flow from './fixtures/example.json'

test('stringify', async () => {
  expect(await new RecorderPlugin().stringify(flow as UserFlow)).toBe(
    await readFile(join(__dirname, 'fixtures/example.js'), 'utf8'),
  )
})

test('stringifyStep', async () => {
  expect(await new RecorderPlugin().stringifyStep(flow.steps[1] as Step)).toBe(
    "await waitFor(() => screen.getByText('More information...'))\n",
  )
})
