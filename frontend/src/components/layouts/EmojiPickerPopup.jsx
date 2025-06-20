import React from 'react'
import EmojiPicker from 'emoji-picker-react'
import { LuImage, LuX } from 'react-icons/lu'

const EmojiPickerPopup = ({icon, onSelect}) => {

    const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 rounded-lg">

                {icon ? (
                    <div className="flex items-center gap-2">
                        <img src={icon} alt="Icon" className=" w-12 h-12" />
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <LuImage size={20} className="text-gray-500" />
                    </div>
                )}
            </div>
            <p className="text-sm text-gray-500">{icon?"Change Icon":"Pick Icon"}</p>
        </div>

        {showEmojiPicker && (
            <div className="relative">
                <button className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-50 cursor-pointer" onClick={() => setShowEmojiPicker(false)}> <LuX/> </button>
                <EmojiPicker
                    open={showEmojiPicker}
                    onEmojiClick={(emoji) => {
                        onSelect(emoji?.imageUrl || '');
                    }}/>
            </div>
        )}
    </div>
  )
}

export default EmojiPickerPopup
