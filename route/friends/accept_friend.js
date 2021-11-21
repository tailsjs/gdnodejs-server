module.exports = {
    url: "acceptGJFriendRequest20.php",
    func: function(q,s,db){
        let users = db.get("users").filter(e => [q.body.accountID, q.body.targetAccountID].indexOf(String(e.id)) != -1).value();
        users[0].friends.unshift(q.body.accountID);
        users[1].friends.unshift(q.body.targetAccountID);
        db.get("friendRequests").remove({ id: Number(q.body.requestID) });
        db.write();
        s.send("1")
    }
};