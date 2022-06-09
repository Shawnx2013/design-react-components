import React from "react";
import withData from "../src/components/withData";

const Speakers = ({speakers}) => {
  return (
    <div>
      {speakers.map(({ imagesrc, name }) => {
        return <img src={`images/${imageSrc}.jpg`} alt={name} key={imagesrc}></img>
      })}
    </div>
  )
}

export default withData(2)(Speakers);