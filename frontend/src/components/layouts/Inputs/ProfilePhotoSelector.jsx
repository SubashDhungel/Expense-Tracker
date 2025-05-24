import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
    // Create a ref to access the hidden <input type="file" /> element
    const inputRef = useRef(null);

    // Local state to hold the preview URL of the selected image
    const [previewUrl, setPreviewUrl] = useState(null);

    // Called whenever the user selects a file from the file picker
    const handleImageChange = (event) => {
    // Access the first file the user selected
    
    //      event is the SyntheticEvent triggered by the onChange.
    //      event.target is the input element(i.e. < input type = "file" >).
    //      event.target.files is a list of the selected files(even though we usually just use the first one: [0]).
        const file = event.target.files[0];

        if (file) {
            // Update parent state with the selected file
            setImage(file);

            // Create a temporary URL for previewing the image in the browser
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    // Called when user clicks the delete/trash button
    const handleRemoveImage = () => {
        // Remove the selected image
        setImage(null);

        // Remove the preview
        setPreviewUrl(null);
    };

    // Called when user clicks the upload button
    const chooseFile = () => {
        // inputRef is a reference to the hidden file input element
        // We use .click() to simulate a user click on that input
        // This opens the native file picker dialog
        inputRef.current.click();
    };

    return (
        <div className='flex justify-center mb-6'>
            {/* Hidden file input to select image */}
            <input
                type="file"                 // This opens the system's file picker
                accept="image/*"           // Only accept image files (png, jpg, etc.)
                ref={inputRef}             // Assign the input to the ref for programmatic access
                onChange={handleImageChange} // When user picks a file, this gets triggered
                className='hidden'         // Hide it visually but keep it functional
            />

            {/* If no image is selected, show default icon with upload button */}
            {!image ? (
                <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
                    {/* Default profile icon */}
                    <LuUser className='text-4xl text-primary' />

                    {/* Upload button, positioned at bottom right of icon */}
                    <button
                        className='w-8 h-8 flex items-center justify-center bg-purple-500 text-white rounded-full absolute -bottom-1 -right-1 border-none cursor-pointer'
                        onClick={chooseFile}  // Opens the file picker
                    >
                        <LuUpload />
                    </button>
                </div>
            ) : (
                // If image is selected, show image preview and remove button
                <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
                    {/* Display selected image as a circle */}
                    <img
                        src={previewUrl}               // Temporary URL created for preview
                        alt="Profile Picture"
                        className='w-20 h-20 rounded-full object-cover'
                    />

                    {/* Button to remove the selected image */}
                    <button
                        className='w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-full absolute -bottom-1 -right-1 border-none cursor-pointer'
                        onClick={handleRemoveImage}  // Clears image and preview
                    >
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;
