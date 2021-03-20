const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
// const Session = require('./Session');

// realtionships alread created
// User.hasMany(Post, {
//   foreignKey: 'user_id',
// });

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

// realtionships alread created
// Post.hasMany(Comment, {
//   foreignKey: 'post_id',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

// Session.belongsTo(User, {
//   foreignKey: 'sid',
// });

// tutor do not need it
module.exports = { User, Post, Comment };
