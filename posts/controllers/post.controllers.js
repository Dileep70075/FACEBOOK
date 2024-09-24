const Post = require('../model/post.model');
const Request = require('../model/requsts.model');
const mongoose = require('mongoose');
module.exports = {
    add: async function (req, res, next) {
        try {
            if (!req.body.detail)
                return res.status(200).json({ message: 'get a detail', success: false })
            const photoPath = req.file ? req.file.path : null;
            req.body.photo = photoPath;
            req.body.user = req.user._id;
            console.log(req.body);
            const user = new Post(req.body);
            await user.save();
            res.status(200).json({ message: 'photo added successfully', data: user, success: true });
        } catch (error) {
            return res.status(200).json({ message: error.message ? error.message : error })
        }
    },












    getPosts: async function (req, res, next) {
        try {
            const userId = new mongoose.Types.ObjectId(req.user._id);

            const posts = await Post.aggregate([
                {
                    $lookup: {
                        from: 'requests',
                        let: { userId: userId }, // ???????????
                        pipeline: [
                            {
                                $match: {
                                    $expr: {       //  ???????????     
                                        $and: [
                                            { $eq: ['$status', 'accepted'] },
                                            {
                                                $or: [
                                                    { $eq: ['$sender', '$$userId'] },
                                                    { $eq: ['$reciever', '$$userId'] }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            },
                            {
                                $project: {
                                    friendId: {
                                        $cond: {
                                            if: { $eq: ['$sender', '$$userId'] },
                                            then: '$reciever',
                                            else: '$sender'
                                        }
                                    }
                                }
                            }
                        ],
                        as: 'friends' 
                    }
                },
                {
                    $unwind: '$friends'
                },
                {
                    $group: {
                        _id: null,
                        friendIds: { $addToSet: '$friends.friendId' }
                    }
                },
                
                {
                    $addFields: {
                        friendIds: { $concatArrays: ['$friendIds', [userId]] }
                    }
                },
                
                {
                    $lookup: {
                        from: 'posts',
                        localField: 'friendIds',
                        foreignField: 'user',
                        as: 'posts'
                    }
                },
                {
                    $unwind: '$posts'
                },
                {
                    $replaceRoot: { newRoot: '$posts' }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                },

                // likecomments
                {
                    $lookup: {
                        from: 'likes',
                        let: { postId: '$_id' }, // ???????????
                        pipeline: [
                            {
                                $match: {
                                    $expr: {       //  ???????????     
                                        $and: [
                                            { $eq: ['$post', '$$postId'] },
                                        ]
                                    }
                                }
                            }
                        ],
                        as: 'likes'
                    }
                },
                {
                    $lookup: {
                        from: 'comments',
                        let: { postId: '$_id' }, // ???????????
                        pipeline: [
                            {
                                $match: {
                                    $expr: {       //  ???????????     
                                        $and: [
                                            { $eq: ['$post', '$$postId'] },
                                        ]
                                    }
                                }
                            }
                        ],
                        as: 'comments'
                    }
                },


 // likecomments
 {
    $lookup: {
        from: 'likes',
        let: { postId: '$_id' }, // ???????????
        pipeline: [
            {
                $match: {
                    $expr: {       //  ???????????     
                        $and: [
                            { $eq: ['$post', '$$postId'] },
                            { $eq: ['$user', userId] },
                        ]
                    }
                }
            }
        ],
        as: 'mylike'
    }
},
{
    $unwind: {path:'$mylike',preserveNullAndEmptyArrays:true}
},


 // likecomments
                {
                    $project: {
                        _id: 1,
                        commentCount: { $size: '$comments' },
                        likeCount: { $size: '$likes' },
                        mylike: 1,
                        user: { email: 1 },
                        photo: 1,
                        detail: 1,
                        createdAt: 1
                    }
                },

                // likecomments

                {
                    $sort: { createdAt: -1 } // Sort by latest posts
                }
            ]);
console.log(posts)
            res.status(200).json({message:'get allposts successfull' ,data:posts,success:true});
            // res.status(200).json(posts)

        }
        catch (error) {
            return res.status(200).json({ message: error.message ? error.message : error })
        }
    },
















    

    getMyPosts: async function (req, res, next) {
        try {
            const posts = await Post.find({ user: req.user._id }).populate('user');
            res.status(200).json({ message: 'posts get successfully', data: posts, success: true });
        }
        catch (error) {
            return res.status(200).json({ message: error.message ? error.message : error })
        }
    },

}