module.exports = {
    url: "accounts/loginGJAccount.php",
    func: function(q,s,db){
        let user = db.get("users").find(e => e.nick.toLowerCase() === q.body.userName.toLowerCase() && e.password == q.body.password).value();
        if(!user){
            s.send("-1");
        }else{
            if(!user.verified)return s.send("-2");
            s.send(`${user.id},${user.id}`);
        }
    },
    needRegister: false 
};