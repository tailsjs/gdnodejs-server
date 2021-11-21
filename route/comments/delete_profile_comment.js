module.exports = {
    url: "deleteGJAccComment20.php",
    func: function(q,s,db){
        let user = db.get("users").find({ id: Number(q.body.accountID) }).value();
        needComment = user.accComments.filter(e => e.commentID == q.body.commentID)[0];
        user.accComments = user.accComments.filter(e=>e!=needComment);
        db.write();
        s.send("1")
    }
};