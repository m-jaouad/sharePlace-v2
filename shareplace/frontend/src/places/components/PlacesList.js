/**
 * here we need to make some request to the back-end to fetch the places data that we nedd
 * @param {*} props
 */

import PlaceItem from "./PLaceItem";
import image from "../../images/place.png";

const places = [
  {
    id: "p1",
    name: "the Name of the place",
    description: "the desription of the place",
    image: image,
  },
  {
    id: "p2",
    name: "the Name of the place",
    description: "the desription of the place",
    image: image,
  },
];

const PlacesList = (props) => {
  return (
    <div>
      {places.map((place) => {
        return (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.image}
            name={place.name}
            description={place.description}
          />
        );
      })}
    </div>
  );
};

export default PlacesList;
