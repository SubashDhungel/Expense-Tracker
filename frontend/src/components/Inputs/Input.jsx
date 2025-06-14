import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, placeholder, label, type }) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    }
    
    return (
        <div>
            <label className=" font-semibold text-[13px] text-slate-600">{label}</label>
            <div className="input-box">
                <input 
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
            </div>
        </div>
    );
}

export default Input;