const User = require('../model/User');
// const { ref } = require('process'); is this neded?

const handleLogout = async (req, res) => {
    //on client also delete the access token

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //no content to send back
    const refreshToken = cookies.jwt;

    //is refresh token in db?
    //foundUser is a mongoose document that we found and can now modify and save
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    //We found the refresh token in the database, now we need to delete
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}


module.exports = { handleLogout };