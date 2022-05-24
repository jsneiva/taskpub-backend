import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { prisma } from '@config/prisma'

const options = {
  secretOrKey: process.env.APP_KEY || 'taskpub',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: payload.id } })
      done(null, user || false)
    } catch (error) {
      done(error, false)
    }
  })
)

export function authenticate() {
  return [passport.authenticate('jwt', { session: false })]
}
