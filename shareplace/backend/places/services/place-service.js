import Place from "../models/Place.js";

export default class PlaceService {
  static createPlace = async (placeData) => {
    const { name, address, image, creator, description } = placeData;
    const newPlace = new Place({ name, address, image, creator, description });
    try {
      await newPlace.save();
    } catch (err) {
      throw new Error("Could not save the place, Please try later");
    }
    return newPlace;
  };

  static getPlaceCreator = async (placeId) => {
    let existingPlace;
    try {
      existingPlace = await Place.findById(placeId).populate("creator");
    } catch (err) {
      throw new Error("could not find the creator of the provided place id");
    }

    return existingPlace.creator;
  };

  static getAllPlaces = async () => {
    let places;
    try {
      places = await Place.find({});
    } catch (err) {
      return next(new Error("something went wrong, Please try again"));
    }

    if (!places) {
      throw new Error("could not find any place");
    }

    return places;
  };

  static deletePlaceById = async (placeId) => {
    try {
      await Place.findByIdAndRemove(placeId);
    } catch (err) {
      throw new Error("Could not delete the place with the provided id");
    }
  };

  static updatePlaceByid = async (placeId, updatedData) => {
    const { name, address, image } = updatedData;
    try {
      const previousPlace = await Place.findByIdAndUpdate(
        placeId,
        {
          name,
          address,
          image,
        },
        { useFindAndModify: false }
      );
      return previousPlace;
    } catch (error) {
      throw new Error("Could not update the place with the provided id");
    }
  };
  static getPlacesOfUser = async (userId) => {
    try {
      const places = await Place.find({ creator: userId });
      return places;
    } catch (err) {
      throw new Error("Something went wrong, Please try later");
    }
  };
}
