import PlaceService from "../services/place-service.js";

export default class PlaceContrl {
  static apiCreatePlace = async (req, res, next) => {
    let createdPlace;
    try {
      createdPlace = await PlaceService.createPlace(req.body);
    } catch (err) {
      return next(new Error(err.message));
    }
    res
      .status(200)
      .json({ createdPlace: createdPlace.toObject({ getters: true }) });
  };
  static apiGetPlaceUser = async (req, res, next) => {
    const placeId = req.params.id;
    let placeCreator;
    try {
      placeCreator = await PlaceService.getPlaceCreator(placeId);
    } catch (err) {
      return next(new Error(err.message));
    }

    res.status(200).json({ placeCreator });
  };

  static apiGetAllPlaces = async (req, res, next) => {
    let places;
    try {
      places = await PlaceService.getAllPlaces();
    } catch (err) {
      return next(new Error(err.message));
    }
    res.status(200).json({
      places: places.map((place) => place.toObject({ getters: true })),
    });
  };
  static apiDeletePlaceById = async (req, res, next) => {
    const placeId = req.params.id;
    try {
      await PlaceService.deletePlaceById(placeId);
    } catch (err) {
      return next(new Error(err.message));
    }
    res.status(203).json({ message: "place was deleted with success !!" });
  };

  static apiUpdatePlace = async (req, res, next) => {
    const placeId = req.params.id;
    const { name, address, image } = req.body;
    try {
      const resUpdate = await PlaceService.updatePlaceByid(placeId, {
        name,
        address,
        image,
      });
      res.status(203).json({ resUpdate });
    } catch (err) {
      return next(new Error(err.message));
    }
  };

  static apiGetPlacesOfUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
      const places = await PlaceService.getPlacesOfUser(userId);
      res
        .status(202)
        .json(places.map((place) => place.toObject({ getters: true })));
    } catch (err) {
      return next(new Error(err.message));
    }
  };
}
