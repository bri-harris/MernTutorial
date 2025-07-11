const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data } 
}
const bcrypt = require('bcrypt'); //user password authenitcation

const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
    const {user, pwd} = req.body;
    if(!user || !pwd) return res.status(400).json({'message': 'Username and password are required.'});
    const foundUser = usersDB.users.find(person => person.username === user);
    if(!foundUser) return res.sendStatus(401); //Unauthorized
    //evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match){
        //grab roles put on our users JSON
        const roles = Object.values(foundUser.roles);

        //create access & refresh token here
        const accessToken = jwt.sign(
            //pass in a payload
            {
                "UserInfo":{
                    "username": foundUser.username,
                    "roles": roles
                    }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        );
        const refreshToken = jwt.sign(
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        //save the refresh token with the current user in the database, this allows a logout route in the future to invalidate the token at logout
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = {...foundUser, refreshToken};
        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        //send refresh token as http cookie
        res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        // res.cookie('jwt', refreshToken, {httpOnly: true, sameSite:'None', secure: true, maxAge: 24 * 60 * 60 * 1000});
        res.json({ accessToken}); //send access token to user
    }else{
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };