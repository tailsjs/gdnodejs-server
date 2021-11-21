module.exports = {
    url: "blockGJUser20.php",
    func: function(q,s,db){
        let users = db.get("users").filter(e => [q.body.accountID, q.body.targetAccountID].indexOf(String(e.id)) != -1).value();
        if(users[0].blacklist.indexOf(q.body.targetAccountID) != -1)return s.send("-1");
        let filter = { from: q.body.accountID, to: q.body.targetAccountID };
        let req = db.get("friendRequests").find(filter).value();
        if(req){
            db.get('friendRequests').remove(req).write();
            s.send("1")
        }else{
            filter = { from: q.body.targetAccountID, to: q.body.accountID };
            req = db.get("friendRequests").find(filter).value();
            if(req){
                db.get('friendRequests').remove(req).write();
                s.send("1")
            }else{
                
                users[0].friends = users[0].friends.filter(e => e != q.body.accountID);
                users[1].friends = users[1].friends.filter(e => e != q.body.targetAccountID);
                users[0].blacklist.unshift(q.body.targetAccountID);
                db.write();
                s.send("1")
            }
        }
    }
};