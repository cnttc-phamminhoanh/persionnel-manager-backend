import { Response } from "express"

export const errorHandler = (error: any, res: Response) => {
  let statusCode = error.code ?? 500
  let additionCode

  if (typeof statusCode !== 'number' || statusCode > 599 || statusCode < 100) {
    additionCode = statusCode
    statusCode = 500
  }

  const message = error.message || error.code || 'Some thing went wrong!'

  return res.status(statusCode).json({
    message,
    additionCode
  })
}
