const User=require('../model/User')
const {comparePassword,generateJwtToken}=require('../security/Security')

const login=async (req, res) =>{
    const {email,password}=req.body;
    try {
        const user =await User.findOne({
            email: email
        })
        if (!user) {
            return res.status(404).send('User not found')
        }
        if (await comparePassword(password.toString(), user.password)) {
            const tokenPayload = {
                email: user.email,
                id: user.id
            }
            const token = generateJwtToken(tokenPayload)
            res.status(200).send({token})
        } else {
            res.status(401).send('compare and generateToken error')
        }
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports={login}
