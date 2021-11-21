module.exports = {
    url: "deleteGJFriendRequests20.php",
    func: function(q,s,db){
        let filter = q.body.accounts == null ? (q.body.isSender == "1" ? { from: q.body.accountID, to: q.body.targetAccountID } : { from: q.body.targetAccountID, to: q.body.accountID }) : 1;
        if(filter != 1){
            let req = db.get("friendRequests").find(filter).value();
            if(req){
                db.get("friendRequests").remove(filter).write();
                s.send("1")
            }else{
                req = db.get("friendRequests").find({ from: q.body.accountID, to: q.body.targetAccountID }).value();
                if(req){
                    db.get("friendRequests").remove({ from: q.body.accountID, to: q.body.targetAccountID }).write();
                    s.send('1')
                }
                else
                s.send("-1")
            }
        }else{
            for(let i of q.body.accounts.split(",")){
                filter = q.body.isSender == "1" ? { from: q.body.accountID, to: i } : { from: i, to: q.body.accountID };
                let req = db.get("friendRequests").find(filter).value();
                if(req){
                    db.get("friendRequests").remove(filter).write()
                }else{
                    s.send("-1")
                }
                s.send("1")
            }
        }
    }
};