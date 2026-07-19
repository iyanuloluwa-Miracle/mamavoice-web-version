import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  return {
    status: 'OK',
    message: 'Welcome to Monnify Payment'
  }
})
