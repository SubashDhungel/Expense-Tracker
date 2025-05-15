import React, { useRef ,useState} from 'react'
import { LuUser,LuUpload, LuTrash } from 'react-icons/lu';
const ProfilePhotoSelector = ({image,setImage}) => {
    const inputRef=useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
   
    const handleImageChange = (event) => {
        const file=event.target.files[0];
        if (file) {
            // Update Image
            
                setImage(file);
            // Genertae preview URL
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
         
            
        } 
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {    
        inputRef.current.click();
    };

  return (
    <div className='flex justify-center mb-6 '>
        <input 
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
        />

        {!image ? (
            <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
                <LuUser className='text-4xl text-primary'></LuUser>
                <button className='w-8 h-8 flex items-center justify-center bg-purple-500 text-white rounded-full absolute -bottom-1 -right-1 border-none cursor-pointer' onClick={onChooseFile}>
                <LuUpload></LuUpload>
                </button>
            </div>
        ):(
            <div className=" relative">
                <img src={previewUrl} alt="Profile Picture" className='w-20 h-20 rounded-full object-cover'/>
                <button className='w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-full absolute -bottom-1 -right-1 border-none cursor-pointer' onClick={handleRemoveImage}>
                    <LuTrash></LuTrash>
                </button>
            </div>
        )}
      
    </div>
  )
}

export default ProfilePhotoSelector
