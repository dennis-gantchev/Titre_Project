import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

const AuthMiddleware = {
    verifToken: (req,res,next) => {


        let token = JSON.parse(JSON.stringify(req.headers)).authorization
        console.log(token)
        token = token.split(' ')[1]
        const tokenDecode = jwt.decode(token,process.env.jwtSecret)

        if(tokenDecode){
            req.params.accountId = tokenDecode.id
            return next()
        }

        res.status(403)
        res.send({ok: false,status:403})


    },

    verifAgent: (req,res,next) => {
        let token = JSON.parse(JSON.stringify(req.headers)).authorization

        token = token.split(' ')[1]
        const tokenDecode = jwt.decode(token,process.env.jwtSecret)

        const isAgent = tokenDecode.roleLevel > 1
        if(isAgent){
            req.params.accountRole = tokenDecode.roleId
            req.params.accountId = tokenDecode.id
            return next()
        }

        res.status(403)
        res.send({ok: false, status:403})
    },
    verifAdmin: (req,res,next) => {
        let token = JSON.parse(JSON.stringify(req.headers)).authorization

        token = token.split(' ')[1]
        const tokenDecode = jwt.decode(token,process.env.jwtSecret)

        const isAdmin = tokenDecode.roleLevel === 3
        if(isAgent){
            return next()
        }

        res.status(403)
        res.send({success: false, errors: [{message: "Forbidden"}]})
    }
}

export default AuthMiddleware