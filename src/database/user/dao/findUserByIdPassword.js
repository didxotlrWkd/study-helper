const { User } = require('../../../database')

module.exports = async ({email, password}) => {
    try {
        const user = await User.findOne({
            where: {
                email,
                password
            }
        }
        )

        return user
    } catch (err) {
        throw err
    }


}