module.exports = {
    url: "uploadGJAccComment20.php",
    func: function(q,s,db){
        let user = db.get("users").find({ id: Number(q.body.accountID) }).value();
        user.accComments.unshift({
            comment: q.body.comment,
            time: Math.floor(Date.now()/1000),
            commentID: user.accComments.length == 0 ? user.accComments.length+1 : user.accComments[0].commentID+1,
            likes: 0
        });
        db.write();
        s.send("1")
    }
};