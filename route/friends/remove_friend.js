module.exports = {
    url: "removeGJFriend20.php",
    func: function(q,s,db){
        let users = db.get("users").filter(e => [q.body.accountID, q.body.targetAccountID].indexOf(String(e.id)) != -1).value();
        users[0].friends = users[0].friends.filter(e => e != q.body.accountID);
        users[1].friends = users[1].friends.filter(e => e != q.body.targetAccountID);
        db.write();
        s.send("1")
    }
};