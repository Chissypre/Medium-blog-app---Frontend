
import {Toaster, toast} from 'react-hot-toast'
import axios from 'axios';



const uploadImage = async (base64EncodedImage) => {
  try {
      let loadingToast = toast.loading("Uploading...");
      const response = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/upload`, {
          data: base64EncodedImage,
      }, {
          headers: {
              'Content-Type': 'application/json',
          },
      });

      toast.dismiss(loadingToast);
      toast.success('Image uploaded successfully');

      return response; // Return the response here
  } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
      throw err; // Rethrow the error to propagate it further if needed
  }
}; 

export default uploadImage;
