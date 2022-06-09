import { useState, useEffect } from "react";
import axios from "axios";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure"
}

const url = "api/speakers";

function useRequestRest(){
  const [data, setData] = useState([]);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS);
  const [error, setError] = useState("");

  useEffect(() => {
    async function delayFunc(){
      try {
        const result = await axios.get(url);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
        setData(result.data);
      } catch (e) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
        setError(e);
      }
    }
    
    delayFunc();
  }, []);

  function updateRecord(record, doneCallback){
    const original = [...data];
    const newRecords = data.map(function (rec) {
      return rec.id === record.id ? record : rec;
    })

    async function delayFunction(){
      try{
        setData(newRecords);
        await axios.put(`${url}/${record.id}`, record);
        if(doneCallback){
          doneCallback();
        }
      } catch (e) {
        if(doneCallback)
          doneCallback();
        setData(original);
        console.log("Error thrown inside delayFunction", e);
      }
    }
    delayFunction();
  }

  function insertRecord(record, doneCallback){
    const original = [...data];
    const newRecords = [record, ...data];

    async function delayFunction(){
      try{
        setData(newRecords);
        await axios.post(`${url}/99999`, record);
        if(doneCallback){
          doneCallback();
        }
      } catch (e) {
        if(doneCallback)
          doneCallback();
        setData(original);
        console.log("Error thrown inside delayFunction", e);
      }
    }
    delayFunction();
  }

  function deleteRecord(record, doneCallback){
    const original = [...data];
    const newRecords = data.filter(function(rec) {
      return rec.id != record.id;
    })

    async function delayFunction(){
      try{
        setData(newRecords);
        await axios.delete(`${url}/${record.id}`, record);
        if(doneCallback){
          doneCallback();
        }
      } catch (e) {
        if(doneCallback)
          doneCallback();
        setData(original);
        console.log("Error thrown inside delayFunction", e);
      }
    }
    delayFunction();
  }

  return { data, requestStatus, error, updateRecord, insertRecord, deleteRecord };
}

export default useRequestRest;