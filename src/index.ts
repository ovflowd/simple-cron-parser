#!/usr/bin/env node

// This script is a simple mimic to what "crontab" and other cron parsers would do.
// More details regarding the cron specification are available in numerous sources
// Such as https://en.wikipedia.org/wiki/Cron

import { default as ReadLine } from 'readline'
import { Temporal } from '@js-temporal/polyfill'

import { Input } from './schema'
import { parseCronSyntax, getRelativeDateTimeFromTime } from './cron'
import { executeCommand } from './command'

const inputProcessor = ReadLine.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
})

// Gets only the actual command arguments
const processArguments = process.argv.slice(2)

// Parses the input argument time to Temporal
const currentDateTime = getRelativeDateTimeFromTime(Temporal.PlainTime.from(processArguments[0]))

inputProcessor.on('line', (input: string) => {
  const parsedInput = Input.safeParse(input)

  if (parsedInput.success) {
    const parsedCommand = parseCronSyntax(parsedInput.data, currentDateTime)

    executeCommand(parsedCommand, currentDateTime)
  }
})
