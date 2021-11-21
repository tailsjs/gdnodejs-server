module.exports = {
    url: "reportGJLevel.php",
    func: function(q,s,db){
       q.utils.sendTelegram(`Report! (level_id: ${q.body.levelID})`);
       s.send("1")
    }
};