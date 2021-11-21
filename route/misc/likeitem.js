module.exports = {
    url: "likeGJItem211.php",
    func: function(q,s,db){
        if(q.body.type == "1"){
            let lvl = db.get("levels").find({ id: Number(q.body.itemID) }).value();
            if(q.body.like == "0"){
                lvl.likes -= 1
            }else{
                lvl.likes += 1
            };
            db.write();
            return s.send(String(lvl.likes))
        }else if(q.body.type == "2"){
            let comment = db.get("comments").find({ commentID: Number(q.body.itemID) }).value();
            if(q.body.like == "0"){
                comment.likes -= 1
            }else{
                comment.likes += 1
            };
            db.write();
            return s.send(String(comment.likes))
        }else if(q.body.type == "3"){
            let profile = db.get("users").find({ id: Number(q.body.special) }).value();
            let comment = profile.accComments.length < 2 ? profile.accComments[0] : profile.accComments.find({ commentID: Number(q.body.itemID) });
            if(q.body.like == "0"){
                comment.likes -= 1
            }else{
                comment.likes += 1
            };
            db.write();
            return s.send(String(comment.likes))
        }
    }
};