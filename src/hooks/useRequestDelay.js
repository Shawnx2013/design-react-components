import { useState, useEffect } from "react";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure"
}

function useRequestDelay(delayTime = 1000, initialData = []){
  const [data, setData] = useState(initialData);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS);
  const [error, setError] = useState("")

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function delayFunc(){
      try {
        await delay(delayTime);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
        //throw "Had Error....";
        setData(data);
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
        await delay(delayTime);
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
        await delay(delayTime);
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
        await delay(delayTime);
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

export default useRequestDelay;