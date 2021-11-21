module.exports = {
    url: "updateGJUserScore22.php",
    func: function(q,s,db){
        if(q.body.gameVersion[0] != "21")return;
        let user = db.get("users").find({ nick: q.body.userName }).value();
        if(!user)return s.send("-1");
        for(let i of Object.keys(q.body))if(["gameVersion", "binaryVersion", "gdw", "accountID", "gjp", "userName", "seed", "seed2", "secret"].indexOf(i) == -1)user[i] = q.body[i];
        db.write();
        return s.send(q.body.accountID)
    }   
}
