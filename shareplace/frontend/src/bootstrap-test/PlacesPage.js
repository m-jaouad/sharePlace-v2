import React, { useEffect } from "react";
import ModalError from "./ModalError";
import PlaceItem from "./PlaceItem";
import { useState } from "react";
import useHttpRequest from "../shared/hooks/http-hook";

const PlacesPages = (props) => {
  const [show, setShow] = useState(false);
  const [places, setPlaces] = useState([]);
  const { sendRequest, error, clearError } = useHttpRequest();

  console.log("error : ", error);
  const deleteHandler = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const saveHandler = () => {
    /** some login to save the changes  */
    /** but for now , let's just close the modal box */
    console.log("sending a request to delete the place");
    setShow(false);
  };
  useEffect(() => {
    const getAllPlaces = async () => {
      try {
        const places = await sendRequest("http://localhost:5000/api/places");
        setPlaces(places.places);
      } catch (err) {
        console.log(err);
      }
    };
    getAllPlaces();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ModalError
        title="Are you sure ??"
        show={show}
        error="you're about deleting this place, Please note that this operation is irreversible"
        onClose={handleClose}
        onSave={saveHandler}
        onHide={handleClose}
        action="Delete"
      />
      <ModalError
        show={error}
        onClose={clearError}
        onHide={clearError}
        error={error}
      />
      {places.map((place) => {
        return (
          <PlaceItem
            key={place.id}
            id={place.id}
            onDelete={deleteHandler}
            name={place.name}
            description={place.description}
            creator={place.creator}
          />
        );
      })}
    </React.Fragment>
  );
};

export default PlacesPages;
