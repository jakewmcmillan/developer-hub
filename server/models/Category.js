const { Schema, model } = require('mongoose');


const categorySchema = new Schema({
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

module.exports = Category;