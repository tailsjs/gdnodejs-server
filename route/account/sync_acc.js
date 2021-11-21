module.exports = {
    url: "/database/accounts/syncGJAccountNew.php",
    func: function(q,s,db){
        const user = db.get("users").find({ nick: q.body.userName, password: q.body.password }).value();
        if(!user)return s.send("-1");
        s.send(user.saveData + ";21;30;a;a")
    }
};