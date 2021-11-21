module.exports = {
    url: "requestUserAccess.php",
    func: function(q,s,db){
        let user = db.get("users").find({ id: Number(q.body.accountID) }).value();
        if(Number(user.modstatus) > 0){
            s.send(String(user.modstatus))
        }else{
            s.send("-1")
        }
    }
};