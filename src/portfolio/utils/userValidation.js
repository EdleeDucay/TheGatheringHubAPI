
export const signinValidate = [
    check("email").exists().withMessage("Email must not be empty"),
    check("password").exists().withMessage("Password must not be empty")
]

export const signupValidate = [
    check("username").exists().withMessage("Username must not be empty"),
    check('email').exists().withMessage("Email must not be empty"),
    check('email').isEmail(),
    check('password').isLength({min: 6}),

]

