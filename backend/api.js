// api.js
const User = require('./models/user');
const Card = require('./models/card');
const token = require('./createJWT'); // Assuming you have your JWT helper in createJWT.js

module.exports = function (app) {


app.post('/api/register', async (req, res) => {
  const { FirstName, LastName, Login, Password } = req.body;

  try {
    // 1. Check if user already exists
    const existingUser = await User.findOne({ Login: Login.trim() });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this login already exists' });
    }

    // 2. Create a new user
    const newUser = new User({
      UserId: Date.now(), // or another unique ID approach
      FirstName: FirstName.trim(),
      LastName: LastName.trim(),
      Login: Login.trim(),
      Password: Password.trim() // In production, hash this!
    });

    await newUser.save();

    // 3. (Optional) Auto-login the user by returning a JWT
    // const jwtToken = token.createToken(newUser.FirstName, newUser.LastName, newUser.UserId);

    // 4. Return success
    res.status(200).json({
      error: '',
      // jwtToken, // if you're returning a token
      firstName: newUser.FirstName,
      lastName: newUser.LastName,
      userId: newUser.UserId
    });
  } catch (e) {
    console.error('Error in /api/register:', e);
    res.status(500).json({ error: e.message });
  }
});


  app.post('/api/addcard', async (req, res, next) => {
    const { userId, card, jwtToken } = req.body;

    try {
      if (token.isExpired(jwtToken)) {
        res.status(401).json({ error: 'The JWT is no longer valid', jwtToken: '' });
        return;
      }

      const newCard = new Card({ Card: card, UserId: userId });
      await newCard.save();

      const refreshedToken = token.refresh(jwtToken);
      res.status(200).json({ error: '', jwtToken: refreshedToken });
    } catch (e) {
      res.status(500).json({ error: e.message, jwtToken: '' });
    }
  });

  app.post('/api/searchcards', async (req, res, next) => {
    const { userId, search, jwtToken } = req.body;

    try {
      if (token.isExpired(jwtToken)) {
        res.status(401).json({ error: 'The JWT is no longer valid', jwtToken: '' });
        return;
      }

      const _search = search.trim();
      const results = await Card.find({
        UserId: userId,
        Card: { $regex: _search + '.*', $options: 'i' }
      });

      const _ret = results.map(result => result.Card);
      const refreshedToken = token.refresh(jwtToken);

      res.status(200).json({ results: _ret, error: '', jwtToken: refreshedToken });
    } catch (e) {
      res.status(500).json({ error: e.message, jwtToken: '' });
    }
  });

  app.post('/api/login', async (req, res) => {
    console.log("Received login request:", JSON.stringify(req.body, null, 2));

    const { Login, Password } = req.body;

    try {
      const results = await User.find({
        Login: Login.trim(),
        Password: Password.trim()
      });

      console.log("Database query result:", JSON.stringify(results, null, 2));

      if (results.length > 0) {
        res.status(200).json({ id: results[0].UserId, firstName: results[0].FirstName, lastName: results[0].LastName, error: '' });
      } else {
        res.status(401).json({ error: "Login/Password incorrect" });
      }
    } catch (e) {
      console.error("Error in /api/login:", e);
      res.status(500).json({ error: e.message });
    }
  });
};
