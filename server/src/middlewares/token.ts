import * as jwt from 'jsonwebtoken'
const generateTokenJwt = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "10d"
    })
}
export {generateTokenJwt};