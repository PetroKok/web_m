import {Strategy} from 'passport-jwt'
import {ExtractJwt} from 'passport-jwt'
import User from '../models/User'

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKeyProvider = "secret"

module.exports = passport => {
    passport.use(new Strategy(opts, (jwt_payload, done) => {
        User.getById(jwt_payload.id, (err, data) => {
            if(err) console.log(err)
            done(err, data)
        })
    }))
}
