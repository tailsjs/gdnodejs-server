module.exports = {
    url: "getGJDailyLevel.php",
    func: function(q,s,db){
        s.send((q.body.weekly == "1" ? "10000" : "") + "1|1337") // Я ЕБУ РОБТОПА В РОТ, У
    }
};