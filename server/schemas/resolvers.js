const { AuthenticationError } = require('apollo-server-express');
const { User, Snippet, Category } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('snippets');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('snippets');
        },
        snippets: async (parent, { username }) => {
            const params = username ? { username } : {};
            return await Snippet.find(params).populate('category').sort({ createdAt: -1 });
        },
        snippet: async (parent, { snippetId }) => {
            return Snippet.findOne({ _id: snippetId });
        },
        categories: async () => {
            return Category.find().populate('snippets')
        },
        category: async (parent, { categoryName }) => {
            return Category.findOne({ categoryName }).populate('snippets');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('snippets');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        addSnippet: async (parent, { snippetText, category }, context) => {
            if (context.user) {
                const {_id} = await Category.findOne({categoryName: category});
                const snippet = await Snippet.create({
                    snippetText,
                    snippetAuthor: context.user.username,
                    category: _id
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { snippets: snippet._id } }
                );

                await Category.findOneAndUpdate(
                    { _id: _id },
                    { $addToSet: { snippets: snippet._id } }
                );

                return snippet;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addComment: async (parent, { snippetId, commentText }, context) => {
            if (context.user) {
                return Snippet.findOneAndUpdate(
                    { _id: snippetId },
                    {
                        $addToSet: {
                            comments: { commentText, commentAuthor: context.user.username },
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeSnippet: async (parent, { snippetId }, context) => {
            if (context.user) {
                const snippet = await Snippet.findOneAndDelete({
                    _id: snippetId,
                    snippetAuthor: context.user.username,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { snippets: snippet._id } }
                );

                return snippet;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeComment: async (parent, { snippetId, commentId }, context) => {
            if (context.user) {
                return Snippet.findOneAndUpdate(
                    { _id: snippetId },
                    {
                        $pull: {
                            comments: {
                                _id: commentId,
                                commentAuthor: context.user.username,
                            },
                        },
                    },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;
