import express from "express";
import jwt from "jsonwebtoken";

const app = express();

const key = "snjansfkjnaeojfneaojfnojaednfjadn";

app.get("/refresh", (req, resp) => {

  const { refresh } = req.headers || "";
  try {
    const ref = jwt.verify(refresh, key);
    const [accessToken, refreshToken] = getTokens();

    resp.json({accessToken, refreshToken});
    
  } catch (error) {
    resp.json({token: null})
  }
  
});

app.get("/verify", (req, resp) => {
  const token = req.headers["token"] || "";
  console.log(token);
  try {
    _ = jwt.verify(token, key);
    resp.json({
      valid: true
    });
  } catch (error) {
    resp.json({
      valid: false,
      error
    });
  }
});

app.get("/token", (req, resp) => {
  const [accessToken, refreshToken] = getTokens();
  resp.json({accessToken, refreshToken});
});

app.listen(5555, () => console.log("SERVER STARTED"));

function getTokens() {
  const accessToken = jwt.sign({
    roles: "user,admin",
    scope: "repo:read",
    id: 1,
    issuer: "prajwal"
  }, key, {
    expiresIn: "3m"
  }, {issuer: "prajwal"});

  const refreshToken = jwt.sign({
    scope: "refresh-token",
  }, key, {
    expiresIn: "1d"
  });
  return [accessToken, refreshToken];
}