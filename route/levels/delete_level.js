module.exports = {
    url: "deleteGJLevelUser20.php",
    func: function(q,s,db){
        let lvl = db.get("levels").find({ id: Number(q.body.levelID) }).value();
        if(lvl.creatorID != q.body.accountID)return s.send("-1");
        let user = db.get("users").find({ id: Number(lvl.creatorID) }).value();
        user.lvls = user.lvls.filter(e=>e!=Number(q.body.levelID));
        db.get("levels").remove({ id: Number(q.body.levelID) }).write();
        db.write();
        s.send("1")
    }
};