const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const userMethod = require('../method/userMethod');


const authCheck = {
    isLoggedIn: async (req,res,next) => {
        if(req.isAuthenticated()){ //로그인 되어있음
            next();
        }else {
            res.status(403).send('로그인 필요');
        }
    }
};

module.exports = authCheck;
