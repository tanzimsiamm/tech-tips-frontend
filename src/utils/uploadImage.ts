import axios from "axios";

const uploadImage = async (image: File) => {
  const formData = new FormData();

  formData.append("image", image);

  const res = await axios.post("http://localhost:5000/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.url;
};

export default uploadImage;
