const { auth } = require('../db')

class Middleware {
  async decodeToken (req, res, next) {
    const token = req.headers.authorization.split(' '[1])

    try {
      const decodeValue = await auth.verifyIdToken(token)

      if (decodeValue) {
        req.user = decodeValue
        return next()
      }

      return res.json({ message: 'Unauthorized' })
    } catch (error) {
      return error
    }
  }
}

module.exports = new Middleware()
