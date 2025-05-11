import { useState } from 'react';
import React from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, placeholder, label, type }) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    }
    
    return (
        <div>
            <label className="font-sans font-semibold text-[13px] text-slate-600">{label}</label>
            <div className="input-box">
                <input 
                    type={type === 'password' ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    className='font-sans w-full bg-transparent outline-none border-none'
                    value={value}
                    onChange={(e) => onChange(e)}
                    required
                />

                {/* { condition && <returnComponent /> } */}
                {/* if(type === "password"){
                    return showPassword ? (
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
                }  */}

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