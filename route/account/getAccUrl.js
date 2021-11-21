module.exports = {
    url: "getAccountURL.php",
    func: async function(q,s,db){
        s.send(`http://${q.headers.host}${q.c.base_route}`)
    }
};