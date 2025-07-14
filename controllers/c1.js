import User from '../models/user.js'; // path may vary

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send('⚠️ Email already registered. Try logging in.');
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    console.log('✅ New user registered:', newUser.email);
    res.redirect('/login');
  } catch (err) {
    console.error('❌ Error registering user:', err);
    res.status(500).send('Something went wrong. Try again later.');
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.send('⚠️ Email not found. Please register first.');
    }

    if (user.password !== password) {
      return res.send('⚠️ Incorrect password.');
    }

    req.session.user = {
      _id: user._id,
      username: user.username,
      email: user.email
    };

    console.log("✅ User logged in:", user.email);
    res.redirect('/profile');
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).send('Something went wrong. Try again later.');
  }
};
