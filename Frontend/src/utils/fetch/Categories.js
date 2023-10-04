import axios from 'axios'

const getCategories = async () => {
    const res = await axios.get(`http://192.168.1.104:5000/api/getCategories`);
    const resData = res.data;
    if (resData.success === true) {
        return(resData.category);
    } else {
        return null
    }
};

export default getCategories