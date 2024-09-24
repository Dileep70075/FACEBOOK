const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const post = require('../model/post.model');

module.exports = {
    sinnUp: async function (req, res, next) {
        try {
            if (!req.body.fname)
                return res.status(200).json({ message: 'please get fname', success: false })
            else if (!req.body.lname)
                return res.status(200).json({ message: 'please get lname', success: false })
            else if (!req.body.email)
                return res.status(200).json({ message: 'please get email', success: false })
            else if (!req.body.address)
                return res.status(200).json({ message: 'please get address', success: false })
            else if (!req.body.password)
                return res.status(200).json({ message: 'please get password', success: false })
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(200).json({ message: 'Email already exists', success: false });
            }
            const photoPath = req.file ? req.file.path : null;
            req.body.photo = photoPath;
            // bcrypt 
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;
            // bcrypt
            const user = new User(req.body);
            await user.save();
            res.status(200).json({ message: 'user added successfully', data: user, success: true });
        }
        catch (error) {
            res.status(200).json({ message: error.message ? error.message : error, success: false })
        }
    },


    login: async function (req, res, next) {
        try {
            if (!req.body.email)
                return res.status(200).json({ message: 'please get email', success: false })
            else if (!req.body.password)
                return res.status(200).json({ message: 'please get password', success: false })
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                const isMatch = await bcrypt.compare(req.body.password, existingUser.password);
                if (isMatch) {
                    const token = await jwt.sign({ userId: existingUser._id }, 'shhhhh');
                    return res.status(200).json({ message: 'login successful', success: true, data: existingUser, token: token });
                } else {
                    return res.status(200).json({ message: 'password not matched', success: false });
                }
            } else {
                return res.status(200).json({ message: 'user not found', success: false });
            }
        }
        catch (error) {
            res.status(200).json({ message: error.message ? error.message : error })
        }
    },

    getUser: async function (req, res, next) {
        try {
            const user = await User.find({ _id: { $ne: req.user._id } }, { email: 1 });
            return res.status(200).json({ message: 'get success', data: user })
        }
        catch (error) {
            res.status(200).json({ message: 'get not data', data: [], error: error })
        }
    },





    getLoginUser: async function (req, res, next) {
        try {
            const users = await User.aggregate([
                {
                    $match: { _id: { $ne: req.user._id } }
                },
                {
                    $lookup: {
                        from: "requests",
                        let: { userId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$sender", "$$userId"] },
                                            { $eq: ["$reciever", req.user._id] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: 'userRequest'
                    }
                }, 
                { $unwind: { path: '$userRequest', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: "requests",
                        let: { userId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$reciever", "$$userId"] },
                                            { $eq: ["$sender", req.user._id] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: 'myRequest'
                    }
                },
                { $unwind: { path: '$myRequest', preserveNullAndEmptyArrays: true } },
                { $project: { email: 1, fname: 1, myRequest: 1, userRequest: 1 } }

            ])
            return res.status(200).json({ message: 'getLoginUser success', data: users, success: true })
        }
        catch (error) {
            res.status(200).json({ message: error.message ? error.message : error })
        }
    },
    updateUser: async function (req, res, next) {
        // try {
        //     if (req.body.password) {
        //         const hashedPassword = await bcrypt.hash(req.body.password, 10);
        //         req.body.password = hashedPassword;
        //     }
        //     const updatedUser = await User.findByIdAndUpdate(req.user, { $set: req.body }, { new: true });

        //     if (!updatedUser) {
        //         return res.status(404).json({ message: 'User not found', success: false });
        //     }
        //     res.status(200).json({ message: 'User updated successfully', data: updatedUser, success: true });

        // } 
        try {
            if (req.body.password) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                req.body.password = hashedPassword;
            }
            if (!req.user)
                return res.status(404).json({ message: 'invalid token', success: false });
            const existingUser = await User.findOne({ user: req.user })
            if (existingUser)
                return res.status(404).json({ message: 'user match', success: false });
            const updatedUser = await User.findByIdAndUpdate(req.user, { $set: req.body }, { new: true })

            await updatedUser.save()
            res.status(200).json({ message: 'User updated successfully', data: updatedUser, success: true });
        }
        catch (error) {
            res.status(500).json({ message: error.message ? error.message : error, success: false });
        }
    },
    deleteUser: async function (req, res, next) {
        try {
            if (!req.query) {
                return res.status(200).json({ message: 'id not match', success: false })
            }
            console.log(req.query)
            //  await User.deleteOne({_id:req.query.id});
            const user = await User.findByIdAndDelete(req.query);
            res.status(200).json({ message: 'deleted successfull', success: true })
        }
        catch (error) {
            res.status(200).json({ message: 'iternal error', success: false, error: error })
        }
    },
    updatePassword: async function (req, res, next) {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Old password and new password are required', success: false });
        }
        console.log('login user', req.user);
        try {

            const isMatch = await bcrypt.compare(oldPassword, req.user.password);
            if (!isMatch) {
                return res.status(200).json({ message: 'old password not matched', success: false });
            }


            const encreptedPassword = await bcrypt.hash(newPassword, 10);

            await User.findByIdAndUpdate(req.user, { password: encreptedPassword }, { new: true });
            res.status(200).json({ message: 'password updated successfully', success: true });

        } catch (error) {
            console.error('Error updating email:', error);
            res.status(500).json({ message: 'Server error', success: false });
        }
    },
    myProfile: async function (req, res, next) {
        // if (req.user) {
        //     return res.status(200).json({ message: 'user found', success: true, data: req.user })
        // } else {
        //     return res.status(200).json({ message: 'user not found', success: false })
        // }
        try {
            const user = await User.findById(req.user)
            if (user) { return res.status(200).json({ message: 'user found', success: true, data: req.user }) }
            else { }
        }
        catch (error) {
            res.status(200).json({ message: 'iternal error', success: false, error: error })
        }
    },


}