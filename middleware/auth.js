import jwt from "jsonwebtoken"
import { Profile } from "../models/profile.js"


const SECRET = process.env.SECRET

const decodeUserFromToken = (req, res, next) => {
  let token = req.get("Authorization") || req.query.token || req.body.token
  if (token) {
    token = token.replace("Bearer ", "")
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        next(err)
      } else {
        req.user = decoded.user
        next()
      }
    })
  } else {
    next()
  }
}

function checkAuth(req, res, next) {
  return req.user ? next() : res.status(401).json({ msg: "Not Authorized" })
}

function isAdmin(req, res, next) {
  Profile.findById(req.user?.profile)
  .then(profile => {
    if(!profile.isAdmin) {
      res.redirect('/')
    } else {
      console.log('ADMIN ACCESS')
    }
  })
}

export { 
  decodeUserFromToken, 
  checkAuth, 
  isAdmin 
}
