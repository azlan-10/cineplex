const zod = require('zod');

const signupschema = zod.object({
    firstname: zod.string(),
    lastname:  zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8)
})

const loginschema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8)
})

module.exports = {signupschema , loginschema}