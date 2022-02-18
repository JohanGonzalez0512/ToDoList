const {User} = require("../models/index");
const bcrypt = require("bcrypt");
const { createJWT } = require("../helpers/jwt");

const login = async(req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
        where: { username },
      });
    
      if (!user) {
        return res.status(404).json({
          ok: false,
          msg: "Invalid credentials, try again",
        });
      }
   
    const validPass = bcrypt.compareSync(password,user.toJSON().password);
    if(!validPass){
        return res.status(403).json({
            ok: false,
            msg: "Invalid credentials, try again",
        });
    }
    const {id,name,lastname,avatar,...resto} = user.toJSON()
    const jwt = await createJWT(id, username)
    res.json({
        ok : true,
        token : jwt,
        id,
        name,
        lastname,
        username,

    });

  } catch ( err) {
    console.log(err);
    res.status(500).json({
        ok : false,
        msg : "Talk to the administrator"
    })
  }
}
const signup = async (req, res) => {
  const { avatar, password, ...resto } = req.body;

  try {
    // Generate salt and hash of the password
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    const user = new User({ ...resto, password: hash });
    const userDB = await user.save();
    const {password:passwordDB,...restoUserDB} = userDB.toJSON();
    const jwt = await createJWT(restoUserDB.id, restoUserDB.username)
    res.status(201).json({
        ok : true,
        msg : 'User signed up successfully',
        token : jwt,
        ...restoUserDB
    })
  } catch (err) {
      console.log(err);
      res.status(500).json({
          ok : false,
          msg : "Talk to the administrator"
      })
  }
};


module.exports = {
  login,
  signup
}
