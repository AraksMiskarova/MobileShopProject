const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const Session = require("../models/Session");
const Customer = require("../models/Customer");

// Controller for refresh token
exports.refreshToken = (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: "Not found refresh token" });
  }

  jwt.verify(refreshToken, keys.secretOrKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Not valide refresh token" });
    }

    await Session.findOne({ _id: decoded.sid }).then(async (ses) => {
      if (!ses)
        return res
          .status(401)
          .json({ status: false, message: "Not found session" });

      // Create JWT Payload
      const getCustomer = await Customer.findOne({ _id: decoded.uid });
      if (!getCustomer)
        return res
          .status(401)
          .json({ status: false, message: "Customer not found" });

      // Delete Session if we have Customer
      await Session.findOneAndDelete(decoded.sid);

      // Create JWT Payload
      const payload = {
        id: getCustomer.id,
        firstName: getCustomer.firstName,
        lastName: getCustomer.lastName,
        isAdmin: getCustomer.isAdmin,
      };

      const newToken = jwt.sign(payload, keys.secretOrKey, { expiresIn: 10 });

      // New Session for private customer
      const newSession = await Session.create({
        sid: getCustomer._id,
      });

      // Create JWTRefresh
      const payloadRefresh = {
        uid: getCustomer.id,
        sid: newSession._id,
      };

      const refreshToken = jwt.sign(payloadRefresh, keys.secretOrKey, {
        expiresIn: 30,
      });

      return res.json({
        success: true,
        token: "Bearer " + newToken,
        refreshToken: refreshToken,
      });
    });
  });
};
