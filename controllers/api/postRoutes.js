const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//used the project to help me get get routes we worked on as a group.
router.get('/', async (req, res) => {
  try {
    // Get all sessions and JOIN with user data
    const dbPostData = await Post.findAll({
      include: [
        {
          model: Post,
        },
      ],
    });

    const post = dbPostData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/homepage', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('homepage', {
      ...user,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/homepage', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.loggedIn) {
//     res.redirect('/homepage');
//     return;
//   }

//   res.render('login');
// });

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      post_title: req.session.post_body,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
