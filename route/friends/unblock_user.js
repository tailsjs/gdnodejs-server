module.exports = {
    url: "unblockGJUser20.php",
    func: function(q,s,db){
        let user = db.get("users").find({ id: Number(q.body.accountID) }).value();
        user.blacklist = user.blacklist.filter(e => e != q.body.targetAccountID);
        db.write();
        s.send("1")
    }
};