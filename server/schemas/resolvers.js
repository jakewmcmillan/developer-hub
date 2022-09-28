const { Thought, User } = require('../models');

const resolvers = {
    Query: {
        User: async () => {
            return User.find();
        },

        User: async (parent, { UserId }) => {
            return User.findOne({ _id: UserId });
        },
    },

    Mutation: {
        addProfile: async (parent, { name }) => {
            return User.create({ name });
        },
        addComment: async (parent, { UserId, commentText }) => {
            return User.findOneAndUpdate(
                { _id: UserId },
                {
                    $addToSet: { comments: { commentText } },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
        removeUser: async (parent, { UserId }) => {
            return User.findOneAndDelete({ _id: UserId });
          },
        removeComment: async (parent, { thoughtId, commentId }) => {
            return Thought.findOneAndUpdate(
              { _id: thoughtId },
              { $pull: { comments: { _id: commentId } } },
              { new: true }
            );
        },
    },
};

module.exports = resolvers;
