import Like from "../models/Like.js";

export default class LikeContrl {
  static createLike = async (req, res, next) => {
    const { userId, placeId, type } = req.body;
    const newLike = new Like({ userId, placeId, type });
    let createdLike;

    /** first we should make sure that the like for the specific place by the specific
     * user is not already exist
     * */
    let existingLike;
    try {
      existingLike = await Like.findOne({ userId, placeId });
    } catch (err) {
      return next(new Error("somethingwent wrong , Please try again"));
    }
    /** if the user has already a request then , press the like button should
     * remove the like list for that place */
    console.log(existingLike);
    if (existingLike) {
      try {
        await Like.remove({ userId, placeId });
        return res
          .status(201)
          .json({ message: "the like was removed with success!!" });
      } catch (err) {
        return next(new Error("could not remove the like, please try again"));
      }
    }
    try {
      await newLike.save();
      res.status(200).json({ message: "the like was added with success" });
    } catch (err) {}
  };
  static getAllLikesByPlace = async (req, res, next) => {
    const { placeId } = req.params;
    let likes;
    try {
      likes = await Like.find({ placeId });
    } catch (err) {
      return next(new Error("Could not fetch the likes, Please try again"));
    }
    if (likes.length === 0) {
      return next(
        new Error("NO likes was found, be the first one who liked the place ")
      );
    }
    res.status(200).json({ likes });
  };
}
