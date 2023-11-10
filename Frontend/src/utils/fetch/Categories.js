import axios from "axios";

const getCategories = async () => {
  const res = await axios.get(`http://localhost:5000/api/getCategories`);
  const resData = res.data;
  if (resData.success === true) {
    return resData.category;
  } else {
    return null;
  }
};

export default getCategories;
