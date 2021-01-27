let jwt = require('jsonwebtoken');
let signkey = 'this_is_for_ximuCMS_API';

exports = module.exports.setToken = function(username, uid){
    return new Promise((resolve)=>{
        const token = jwt.sign({
            name:username,
            _uid:uid
        },signkey,{ expiresIn:'24h' });
        resolve(token);
    })
}

exports = module.exports.signkey = signkey