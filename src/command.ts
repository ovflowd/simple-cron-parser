import { Temporal } from '@js-temporal/polyfill'

import { CommandType } from './schema'

// We're only using an English locale here, but you can use any locale you want.
const relativeDateTimeFormat = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

export const executeCommand = ({ dateTime, command }: CommandType, currentDateTime: Temporal.PlainDateTime) => {
  // Here we simply subtract the amount of days from the command dateTime to the currentDateTime
  // If the command dateTime is in the future the value will be positive, otherwise 0.
  const resultingDay = relativeDateTimeFormat.format(dateTime.day - currentDateTime.day, 'day')

  // Retrieves the PlainTime from the PlainDateTime and transforms it into a string showing it in an hour:minute format
  const dateTimeToString = dateTime.toPlainTime().toString({ smallestUnit: 'minute' })

  // Logs the resulting information in the specified output hour:minute today|tomorrow - string
  console.log(`${dateTimeToString} ${resultingDay} - ${command}`)
}
