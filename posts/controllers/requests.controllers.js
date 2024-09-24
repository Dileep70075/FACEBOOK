const request = require('../model/requsts.model');
const User = require('../model/user.model');
const Post = require('../model/post.model');
module.exports = {
    sendrequest: async function (req, res, next) {
        const { receiverId } = req.body;
        try {
            if (!receiverId)
                return res.status(404).json({ message: 'User not found' });
            const reciever = await User.findById(receiverId);
            if (!reciever) {
                return res.status(404).json({ message: 'User not found' });
            }
            const acceptRequest = await request.findOne({
                $or: [{
                    reciever: receiverId,
                    sender: req.user._id
                }, {
                    sender: receiverId,
                    reciever: req.user._id
                }]
            });
            if (acceptRequest) {
                return res.status(400).json({ message: 'Friend request already sent' });
            }
            const newRequest = new request({
                sender: req.user._id,
                reciever: receiverId,
            });
            await newRequest.save();
            res.status(201).json({ message: 'Friend request sent', request: newRequest });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    acceptrequest: async function (req, res, next) {
        const { status,requestId } = req.body;
        try {
            const friendRequest = await request.findByIdAndUpdate({_id: requestId });
            if (!friendRequest) {
                return res.status(404).json({ message: 'Friend request not found' });
            }
            friendRequest.status = status;
            await friendRequest.save();
            res.status(200).json({ message: 'Friend request accepted', request: friendRequest });
        } catch (error) {
            res.status(500).json({ message: error.message ? error.message : error });
        }
    },




    // getPost: async function (req, res, next) {
    //     try {
    //         const { receiverId } = req.query;
    //         if (!receiverId)
    //             return res.status(400).json({ message: 'get receiverId' });
    //         const friendRequest = await Post.find({ user: receiverId }).populate('user');
    //         if (friendRequest) {
    //             // await request.findOne({reciever : receiverId }, {status: 'accepted'});
    //             return res.status(404).json({ message: 'access', data: friendRequest });
    //         } else {
    //             return res.status(400).json({ message: 'user not match' });
    //         }
    //     }
    //     catch (error) {
    //         res.status(500).json({ message: error.message ? error.message : error });
    //     }
    // }
}