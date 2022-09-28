const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const snippetSchema = new Schema({
    snippetText: {
      type: String,
      required: 'Your code needs more code!',
      minlength: 1,
      maxlength: 500,
      trim: true,
    },
    snippetAuthor: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },

    comments: [
      {
        commentText: {
          type: String,
          required: true,
          minlength: 1,
          maxlength: 280,
        },
        commentAuthor: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: (timestamp) => dateFormat(timestamp),
        },
      },
    ],
  });
  
  const Snippet = model('Snippet', snippetSchema);
  
  module.exports = Snippet;
