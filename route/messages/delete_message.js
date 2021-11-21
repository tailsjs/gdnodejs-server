module.exports = {
    url: "deleteGJMessages20.php",
    func: function(q,s,db){
        if(q.body.messageID != null){
            db.get("messages").remove({ id: Number(q.body.messageID) }).write()
        }else{
            for(let i of q.body.messages.split(",")){
                db.get("messages").remove({ id: Number(i) }).write()
            }
        };
        s.send("1")
    }
};