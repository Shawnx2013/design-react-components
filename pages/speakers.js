import React from "react";
import SpeakerRenderProps from "../src/components/SpeakerRenderProps";

const Speakers = () => {
  return (
    <SpeakerRenderProps>
      {({speakers}) => {
        return (
          <div>
            {speakers.map(({ imagesrc, name }) => {
              return (
                <img src={`images/${imageSrc}.jpg`} alt={name} key={imagesrc}></img>
              );
            })}
          </div>
        );
      }}
    </SpeakerRenderProps>
    
  )
}

export default Speakers;