module.exports = {
    url: "uploadFriendRequest20.php",
    func: function(q,s,db){
        if(!db.get("friendRequests").find({ from: q.body.accountID, to: q.body.toAccountID }).value()){
            const id = db.get("serverInfo").value()[0].requests+1;
            db.get('friendRequests').unshift({
                id: id,
                from: q.body.accountID, 
                to: q.body.toAccountID,
                comment: q.body.comment,
                upload_date: Date.now(),
                isRead: false
            }).write();
            q.utils.modifyServerInfo("requests", 1, db);
            s.send(String(id))
        }else{
            s.send("-1")
        }
    }
};