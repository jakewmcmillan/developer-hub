const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      comments: {
        type: String,
        required: true
      },
      Snippet: {
        type: Schema.Types.ObjectId,
        ref: 'Snippetsr'
      }
    }
  );

  const User = model('User', UserSchema);

module.exports = User;