module.exports = {
    url: "getGJGauntlets21.php",
    func: function(q,s,db){
        let gauntlets = db.get("gauntlets").value(),
        gl = "",
        g = [];
        
        
        for(let gaunt of gauntlets){
            levels = gaunt.lvls.join(",");
            gl += `${gaunt.packID}${levels}`;

            g.push(`1:${gaunt.packID}:3:${levels}`)
        };
        s.send(`${g.join("|")}#${q.utils.genSolo2(gl)}`)
    },
    needRegister: false
};