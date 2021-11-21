module.exports = {
    url: "updateGJAccSettings20.php",
    func: function(q,s,db){ 
        let user = db.get("users").find({ id: Number(q.body.accountID) }).value();
        for(let i in q.body)if(["accountID", "gjp", "secret"].indexOf(i) == -1)user[i] = q.body[i];
        db.write();
        s.send('1')
    }
};