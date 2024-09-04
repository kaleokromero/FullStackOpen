const User = require('../models/user')
const logger = require('./logger')

const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if(error.name === 'CastError') {
      return response.status(400).send({error: 'malformattedvid'})
  }else if(error.name === 'ValidationError') {
      return response.status(400).json({error: error.message})
  }else if(error.name === 'MongoServerError' && error.name.includes('E11000 duplicate key error')) {
      return response.status(400).json({error: 'expected `username` to be unique'})
  }else if(error.name === 'JsonWebTokenError') {
      return response.status(401).json({error: 'invalid token'})
  }else if(error.name === 'TokenExpiredError') {
      return response.status(401).json({error: 'token expired'})
  }
  next(error)
}

const tokenExtractor = async (request,response, next) => {
  const authorization = await request.headers.authorization
  try {
  if(authorization && authorization.startsWith('Bearer ')) {
      request.token = authorization.replace('Bearer ','')
  }
  else {
    request.token = null
  }

  }catch (error) {
    next(error)
  }
  next()
}
const userExtractor = async (request, response, next) => {
  if(!request.token) {
    request.user = null
  }
  const decoded = jwt.verify(request.token, process.env.SECRET)
  if(!decoded.id) {
    request.user = null
  }
  request.user = await User.findById(decoded.id)
  next()
} 

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}