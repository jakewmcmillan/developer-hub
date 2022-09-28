const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const categorySchema = new Category({
    categoryName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
    snippets: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Snippet',
        },
      ],
});

const Category = model('Category', categorySchema);
