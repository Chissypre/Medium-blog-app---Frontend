import Embed from "@editorjs/embed";
import List from "@editorjs/list"
import Image from "@editorjs/image"
import Header from "@editorjs/header"
import Quote from "@editorjs/quote"
import Marker from "@editorjs/marker"
import inlineCode from "@editorjs/inline-code";
import axios from 'axios';

const uploadImage = async (base64EncodedImage) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/upload`, {
            data: base64EncodedImage,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Response from server:', response); // Log the response for debugging

        return {
            success: 1,
            file: { url: response.data.uploadResponse.url } // Assuming the server responds with a URL
        };
        
    } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        throw err; // Rethrow the error to propagate it further if needed
    }
};


const uploadImageByFile = async (file) => {
    try {
        const base64EncodedImage = await getBase64(file);
        return uploadImage(base64EncodedImage);
        
    } catch (error) {
        console.error(error);
        toast.error('Something went wrong!');
        throw error; // Rethrow the error to propagate it further if needed
    }
};

const uploadImageByURL = async (url) => {
    try {
        return {
            success: 1,
            file: { url }
        };
    } catch (error) {
        console.error(error);
        toast.error('Something went wrong!');
        throw error; // Rethrow the error to propagate it further if needed
    }
};

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export const tools = {
    embed: Embed,
    list: {
        class: List,
        inlineToolbar: true
    },
    image: {
        class: Image,
        config: {
            uploader: {
                uploadByUrl: uploadImageByURL,
                uploadByFile: uploadImageByFile,
            }
        }
    },
    header: {
        class: Header,
        config: {
            placeholder: "Type Heading....",
            levels: [2, 3],
            defaultLevel: 2
        }
    },
    quote: {
        class: Quote,
        inlineToolbar: true
    },
    marker: Marker,
    inlineCode: inlineCode
};
