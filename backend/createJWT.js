const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createToken = function(firstName, lastName, userId) {
    const payload = { firstName, lastName, userId };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.isExpired = function(token) {
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return false;
    } catch (e) {
        return true;
    }
};

exports.refresh = function(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
        return jwt.sign({ firstName: decoded.firstName, lastName: decoded.lastName, userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
    } catch (e) {
        return "";
    }
};
