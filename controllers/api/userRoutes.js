const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    //want different username. Will helped create 1 user validator
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    console.log(userData);
    if (!userData) {
      const dbUserData = await User.create({
        username: req.body.username,
        password: req.body.password,
      });

      req.session.save(() => {
        req.session.UserId = dbUserData.id;
        req.session.loggedIn = true;

        res.status(200).json(dbUserData);
      });
    } else {
      res.status(409).json({ message: 'User Already Created' });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.loggedIn = true;

      res.status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//used the project to help me get routes we worked on as a group.
router.get('/', async (req, res) => {
  try {
    // Get all sessions and JOIN with user data
    const dbUserData = await Post.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    // Got from project. This is the serialize data so template can read it
    const post = dbUserData.map((post) => post.get({ plain: true }));

    res.render('profile', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Used from project. This uses withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
