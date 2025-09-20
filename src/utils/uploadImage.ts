import axios from "axios";

const uploadImage = async (image: File) => {
  const formData = new FormData();

  formData.append("image", image);

  const res = await axios.post("https://tech-tips-backend-render-deploy.onrender.com/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.url;
};

export default uploadImage;
