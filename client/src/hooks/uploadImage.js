import axios from "axios";

const uploadImage = async (image) => {
    const imageForm = new FormData();
    imageForm.append('image', image);
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api_key}`, imageForm);
    const imageUrl = data?.data?.display_url;
    return imageUrl
}

export default uploadImage
