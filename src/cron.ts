import { Temporal } from '@js-temporal/polyfill'

import { CommandType, InputType } from './schema'

// This helper allows you to continuously update a Temporal PlainDateTime object
// since any Temporal instance is a frozen instance and any modification leads to a new instance
// This allows us to compute changes in a recursive way and without re-defining variables
const getPlainDateTimeSingleton = () => {
  let plainDateTime = Temporal.Now.plainDateTimeISO()

  // Returns a function that allows to update the plainDateTime object (fluent-setter)
  return (updatedDateTime: Temporal.PlainDateTime | Temporal.PlainTime | Temporal.PlainDateTimeLike) => {
    plainDateTime = plainDateTime.with(updatedDateTime)

    return plainDateTime
  }
}

// This gets a Temporal PlainDateTime object with the current day, month and year with the given hour and minute
export const getRelativeDateTimeFromTime = ({ hour, minute }: Temporal.PlainTime): Temporal.PlainDateTime => {
  const currentPlainDateTime = getPlainDateTimeSingleton()

  return currentPlainDateTime({ hour, minute })
}

// This function parses the cron input string into a valid Command object with dateTime and the command string
export const parseCronSyntax = (inputString: InputType, currentDateTime: Temporal.PlainDateTime): CommandType => {
  // We separate the command from the actual time (hour minute) part of the string
  const [command, ...timeInput] = inputString.split(' ').reverse()

  // Transform the string array into a number array
  let [hour, minute] = timeInput.map(Number)

  const commandDateTime = getPlainDateTimeSingleton()

  if (isNaN(hour)) {
    // If the command hour is not a number it means it was an asterisk (*)
    // Then we evaluate if we should add an extra hour or not based if the command minute is lower than the
    // current time minute (e.g.: if the command time is 12:12 and current time is 12:13 we need to add an hour)
    hour = currentDateTime.hour + Number(minute < currentDateTime.minute)

    commandDateTime({ hour })
  }

  if (isNaN(minute)) {
    // If the command minute is not a number it means it was an asterisk (*)
    // Then we want to change the minute to 0 always when the command hour is not the same as the current hour
    // This happens because if the command hour is higher than the current hour the earliest minute would be o'clock
    minute = hour !== currentDateTime.hour ? 0 : currentDateTime.minute

    commandDateTime({ minute })
  }

  // If the command hour is lower than the current hour it means that the earliest time we can run the command
  // would be tomorrow. The same applies if the command hour is equals the current hour but the minute is lower
  // than the current minute.
  if (hour < currentDateTime.hour || (hour === currentDateTime.hour && minute < currentDateTime.minute)) {
    commandDateTime({ day: currentDateTime.day + 1 })
  }

  return { dateTime: commandDateTime({ hour, minute }), command }
}
