let jwt = require('jsonwebtoken');
let signkey = 'this_is_for_ximuCMS_API';

exports = module.exports.setToken = function(name, uid, role){
    return new Promise((resolve)=>{
        const token = jwt.sign({
            _uid:uid,
            name: name,
            role: role
        },signkey,{ expiresIn:'24h' });
        resolve(token);
    })
}

exports = module.exports.signkey = signkey