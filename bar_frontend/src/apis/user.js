import axios from "../config/axios";
import { getToken, removeObjectPrototype } from "../utils/helper";

export const fetchUser= async (id) => {
  try {
    const { data } = await axios.get(`/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // return data.users.map((_item) => removeObjectPrototype(_item));
    console.log('User data from fetchUser :', data)
    return data.users;
  } catch (_error) {
    console.log("fetch specific User error: ", _error);
    return [];
  }
};

export const fetchAllusers= async () => {
  try {
    const { data } = await axios.get(`/user`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("FetchAllUsers Data",data);

    return data.users.map((_item) => removeObjectPrototype(_item));
  } catch (_error) {
    console.log("fetchAllusers error: ", _error);
    return [];
  }
};

export const fetchUsersByCondition = async (body) => {
  try {
    const { data } = await axios.post(`/user/condition`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("fetchUsersByCondition Data: ",data);

    return data.users.map((_item) => removeObjectPrototype(_item));
  } catch (_error) {
    console.log("fetchUsersByCondition error: ", _error);
    return [];
  }
};


export const fetchCommitteeMembers = async () => {
  try {
    const { data } = await axios.get("/user/committeMembers", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("fetchCommitteeMembers data: ", data)
    return data.data.map((_item) => removeObjectPrototype(_item));
  } catch (_error) {
    console.log("fetchCommitteeMembers error: ", _error);
    return [];
  }
};


export const signIn = async (value) => {
  try {
    const { data } = await axios.post("/user/signin", value, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    // return data.map((_item) => removeObjectPrototype(_item));
    return removeObjectPrototype(data);
  } catch (_error) {
    console.log("/user/signin error res: ", _error?.response?.data);
    return _error?.response?.data || { message: 'Something went wrong. Please try again!' }
  }
};
export const signUp = async (body) => {
  try {
    const { data } = await axios.post("/user/signup", body, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    // return data.map((_item) => removeObjectPrototype(_item));
    return removeObjectPrototype(data);
  } catch (_error) {
    console.log("/user/signin error res: ", _error?.response?.data);
    return _error?.response?.data || { message: 'Something went wrong. Please try again!' }
  }
};

export const uploadProfileCover = async (file, userId) => {
  try {
    const { data: data2 } = await axios.post(
      `/user/cover-image/${userId}`,
      {
        doc: file
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getToken()}`
        },
        onUploadProgress: (progressEvent) => {
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          console.log('uploaded: ', percentCompleted)

        }
      }
    )
  } catch (err) {

  }

}
export const uploadProfile = async (file, userId) => {
  try {
    const { data: data2 } = await axios.post(
      `/user/profile-image/${userId}`,
      {
        doc1: file
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getToken()}`
        },
        onUploadProgress: (progressEvent) => {
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          console.log('uploaded: ', percentCompleted)

        }
      }
    )
  } catch (err) {

  }

}

 export const updateUserData=async (id,value)=>{
  try {
    const { data } = await axios.post(`/user/update-user/${id}`, value, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        
        "Authorization": `Bearer ${getToken()}`
      },
    });
    console.log('/user/update-user data: ', data)
    // return data.map((_item) => removeObjectPrototype(_item));
    // return removeObjectPrototype(data);
    return data;
  } catch (_error) {
    console.log("//user/update-user error res: ", _error?.response?.data);
    return _error?.response?.data || { message: 'Something went wrong. Please try again!'}
  }

}

export const getUser= async (id) => {
  try {
    const { data } = await axios.get(
    `/user?id=${id}`,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${getToken()}`
      }
    }
    )
    return data;
  } catch (err) {

  }

}



export const getUsersBySearch=async (query)=>{
  try {
    const { data } = await axios.get(`/user/search?${query}`,{
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      },
    });
    console.log("query Data",data)
    // return data.map((_item) => removeObjectPrototype(_item));
    return data;
  } catch (_error) {
    console.log("/signin error res: ", _error?.response?.data);
    return _error?.response?.data || { message: 'Something went wrong. Please try again!'}
  }

}

export const deleteUser = async (userId) => {
  try {
    const url = `/user/${userId}`
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    }
    const { data } = await axios.delete(url, config)
    console.log('user delete data: ', data)
    return data
  } catch (err) {
    console.log('user delete error: ', err)
    return {}
  }

}