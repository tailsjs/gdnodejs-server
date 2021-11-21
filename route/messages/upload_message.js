module.exports = {
    url: "uploadGJMessage20.php",
    func: function(q,s,db){
        const msg = db.get("serverInfo").value()[0].messages+1;
        db.get("messages").unshift({
            id: msg,
            from: q.body.accountID,
            to: q.body.toAccountID,
            subject: q.body.subject,
            body: q.body.body,
            sended_time: Date.now(),
            checked: false
        }).write();
        q.utils.modifyServerInfo("messages", 1, db);
        s.send("1")
    }
};