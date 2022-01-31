import Card from "../../shared/components/UIelements/Card";
import "./PlaceItem.css";
const PlaceItem = (props) => {
  return (
    <div className="place-item">
      <div className="place-image">
        <img src={props.image} alt={props.name} />
      </div>
      <div className="description">
        <h1 className="place-name"> {props.name} </h1>
        <p className="place-description">{props.description}</p>
      </div>
      <div className="actions"> </div>
    </div>
  );
};

export default PlaceItem;
