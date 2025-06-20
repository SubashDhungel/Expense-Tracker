import { useState, useRef } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { FaRegCalendarAlt } from 'react-icons/fa';

const Input = ({ value, onChange, placeholder, label, type }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const inputRef = useRef(null);
    
    const togglePassword = () => {
        setShowPassword(!showPassword);
    }
    const handleCalendarClick = () => {
        setShowDatePicker(!showDatePicker);
        if (inputRef.current) {
            inputRef.current.showPicker();
        }
    }
    
    return (
        <div className=''>
            <label className=" block font-medium text-sm text-gray-700 mb-1">{label}</label>
            <div className="input-box">
                <input 
                    ref={inputRef}
                    type={type === 'password' ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    className=' w-full bg-transparent outline-none border-none'
                    value={value}
                    onChange={(e) => onChange(e)} //...is just forwarding the event object to the parent component's onChange handler.
                    required
                />

                {/* { condition && <returnComponent /> } */}
               
                {type === "password" && (
                    showPassword ? (
                        <FaRegEye 
                            size={22} 
                            className="text-primary cursor-pointer"
                            onClick={togglePassword}
                        />
                    ) : (
                        <FaRegEyeSlash 
                            size={22}
                            className="text-slate-400 cursor-pointer"
                            onClick={togglePassword}
                        />
                    )
                )}

                  {type === "date" && (
                    <FaRegCalendarAlt
                        size={20}
                        className="text-slate-400 absolute right-9  -translate-y-1/2 "
                        onClick={handleCalendarClick}
                        aria-label="Open date picker"
                    />
                )}


            </div>
        </div>
    );
}

export default Input;