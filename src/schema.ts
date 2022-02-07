import { z } from 'zod'
import { Temporal } from '@js-temporal/polyfill'

// This creates a type and a parser for each line that comes in the Input
export const Input = z.string().refine((input) => /(((d+){0,2}|\*) ?){2}/.test(input))

export const PlainDateTime = z.instanceof(Temporal.PlainDateTime)

export const PlainTime = z.instanceof(Temporal.PlainTime)

export const Command = z.object({
  dateTime: PlainDateTime,
  command: z.string(),
})

export type CommandType = z.infer<typeof Command>

export type InputType = z.infer<typeof Input>
