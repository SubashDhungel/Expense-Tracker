import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile ) =>{
    const formData = new FormData();
    // append image file to form data
    formData.append('image', imageFile);

    try{
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // set header for file upload
            },

        });
        return response.data; // Assuming the API returns the image URL in the response
    }
    catch(error){
        console.log('Error uploading image:', error);
        // Handle specific error cases if needed
        throw error; //Rethrow error for handling
    }

}
export default uploadImage