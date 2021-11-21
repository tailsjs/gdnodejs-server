const config = JSON.parse(require("fs").readFileSync("./config.json"));
module.exports = {
    url: "admin/addgauntlet",
    func: function(q,s,db){
        s.send(`<title>addMapPack</title><form action="${config.base_route}admin/checkGauntlet" method="post">
        <label for="lvls">Levels [ID]: </label>
        <input id="lvls" type="text" name="lvls" required placeholder="1,2,3,4,5"> (PLEASE SEPARATE WITH COMMA, MUST HAVE 5 LEVELS)</br></br></br></br>
        <label for="lvls">Nick: </label>
        <input id="nick" type="text" name="nick" required value=""></br>
        <label for="lvls">Password: </label>
        <input id="pass" type="password" name="pass" required value=""></br>
        <input type="submit" value="Submit!">
        </form>`)
    },
    get: true
};