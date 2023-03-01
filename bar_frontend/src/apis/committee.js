import axios from "../config/axios";
import { removeObjectPrototype } from "../utils/helper";

export const fetchActiveCommittee = async (year) => {
  try {
    const url = "/committee/web/active";
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(url, config);
    console.log("fetchActiveCommittee: ", data);
    return data?.committees?.map((_item) => removeObjectPrototype(_item)) || [];
  } catch (_error) {
    console.log("fetchActiveCommittee error: ", _error);
    return [];
  }
};
export const fetchCommitteeList = async () => {
  try {
    const url = "/committee";
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(url, config);
    console.log("fetchCommitteeList: ", data);
    return data?.committees?.map((_item) => removeObjectPrototype(_item)) || [];
  } catch (_error) {
    console.log("fetchCommitteeList error: ", _error);
    return [];
  }
};
export const updateCommittee = async (value) => {
  try {
    const url = "/committee";
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(url, value, config);
    console.log("UpdateCommittee ", data);
    return data;
  } catch (_error) {
    console.log("Update Committee error: ", _error);
    return [];
  }
};
export const updateCommitteeById = async (id,value) => {
  try {
    const url = "/committee/"+id;
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(url, value, config);
    console.log("UpdateCommittee ", data);
    return data;
  } catch (_error) {
    console.log("Update Committee error: ", _error);
    return [];
  }
};
export const deleteCommittee = async (id) => {
  try {
    const url = "/committee/" + id;
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(url, config);
    console.log("Delete committee ", data);
    return data;
  } catch (_error) {
    console.log("Delete Committee: ", _error);
    return [];
  }
};
export const fetchCommitteeById=async (id)=>{
  try {
    const url = "/committee/"+id;
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(url, config);
    console.log("UpdateCommittee ", data);
    return data;
  } catch (_error) {
    console.log("Update Committee error: ", _error);
    return [];
  }
  

}