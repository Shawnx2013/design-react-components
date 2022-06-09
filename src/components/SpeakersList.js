import { useContext } from "react";
import Speaker from "./Speaker";
import useRequestRest, { REQUEST_STATUS } from "../hooks/useRequestRest";
import ReactPlaceholder from "react-placeholder/lib";
import { data } from "../../SpeakerData";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";
import SpeakerAdd from './SpeakerAdd';

function SpeakersList() {

  const { data: speakersData, requestStatus, error, updateRecord, insertRecord, deleteRecord } = useRequestRest();

  const { searchQuery, eventYear } = useContext(SpeakerFilterContext);

  if (requestStatus === REQUEST_STATUS.FAILURE) {
    return (
      <div className="text-danger">
        ERROR: <b>Loading Speaker Data Failed {error}</b>
      </div>
    )
  }

  // if (isLoading === true) return <div>Loading...</div>

  return (
    <div className="container speakers-list">
      <ReactPlaceholder
        type="media"
        rows={10}
        className="speakerslist-placeholder"
        ready={requestStatus === REQUEST_STATUS.SUCCESS}
      >
        <SpeakerAdd eventYear={eventYear} insertRecord={insertRecord} />
        <div className="row">
          {speakersData
            .filter(function(speaker){
              return (
                speaker.first.toLowerCase().includes(searchQuery) || speaker.last.toLowerCase().includes(searchQuery)
              )
            })
            .filter(function(speaker){
              return speaker.sessions.find((session) => {
                return session.eventYear === eventYear;
              })
            })
            .map(function (speaker) {
              return (
                <Speaker 
                  key={speaker.id} 
                  speaker={speaker} 
                  updateRecord={updateRecord}
                  insertRecord={insertRecord}
                  deleteRecord={deleteRecord}
                />
              )
          })}
            
        </div>
      </ReactPlaceholder>
    </div>
  )
}

export default SpeakersList;