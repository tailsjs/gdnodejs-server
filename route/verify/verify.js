module.exports = {
    url: "verify",
    func: function(q,s,db){
        if(!q.query.token)return s.send("Error!");
        let user = db.get("users").find({ verify_token: q.query.token }).value();
        if(!user){
            return s.send("Error!")
        }else{
            user.verified = true;
            db.write();
            s.send("Success!");
            console.log(`${user.nick} verified!`)
        }
    },
    get: true
};
