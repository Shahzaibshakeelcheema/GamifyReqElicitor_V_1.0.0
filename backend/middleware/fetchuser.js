const JWT = require("jsonwebtoken");

const JWT_SERECT = 'HellothisisGamify';

const fetchuser = (req, res, next) => {
  //get the iser from jwt
  const token = req.header("authtoken");
 
  if (!token) {
    res.status(401).send({ error: "Please authentixate using a variable" });
  }
  console.log(token)
  console.log(JSON.stringify(token))
try {

    const data = JWT.verify(token, JWT_SERECT);
    req.user = data.user;
    next();
 } catch (error) {
    res.status(401).send({error:" please use it"});
  }
};
module.exports = fetchuser;
