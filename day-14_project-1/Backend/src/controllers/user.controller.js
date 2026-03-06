const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")


async function followUserController(req, res) {

    const followerUsername = req.user.username
    const followersUsername = req.params.username


    if (followerUsername == followersUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    const isFollowerExists = await userModel.findOne({
        username: followersUsername
    })

    if (!isFollowerExists) {
        return res.status(404).json({
            message: "User you are trying to follow does not exist"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followers: followersUsername,
    })

    if (isAlreadyFollowing) {
        return res.status(200).json({
            message: `You are already following ${followersUsername}`,
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followers: followersUsername
    })

    res.status(201).json({
        message: `You are now following ${followersUsername}`,
        follow: followRecord
    })
}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username
    const followersUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followers: followersUsername,
    })

    if (!isUserFollowing) {
        return res.status(200).json({
            message: `You are not following ${followersUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `You have unfollowed ${followersUsername}`
    })
}


module.exports = {
    followUserController,
    unfollowUserController
}