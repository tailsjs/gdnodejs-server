module.exports = {
    url: "deleteGJComment20.php",
    func: function(q,s,db){
        db.get("comments").remove({ commentID: Number(q.body.commentID) }).write();
        s.send("1")
    }
};