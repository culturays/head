"use client" 
import { useState } from "react"; 

const ForgottenPass = () => { 
  const [errors, setErrors] = useState({});  
  // Email regex pattern
  const email_pattern = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;

  // Validate the form
  const validateForm = (target) => {
    const errors = {};  
    if (target.name === 'email' && !email_pattern.test(target.value.trim())) {
      errors.email = 'Please enter a valid email';  
    } 
    return errors;
  };
          
  const handleBlur = (e) => {
    const newErrors = validateForm(e.target); // Get name and value from e.target
    setErrors(newErrors);
  };

  return (
    <div className="m-0 p-0 w-full flex flex-col items-center justify-center">  
      <input
        className='login_input border-0 focus:outline-none rounded-b-sm border-solid p-3 bg-gray-300 bg-opacity-60 border-gray-300 text-white tracking-wider'
        name="email"
        type="email"  
        placeholder="you@email.com"
        required={true}  
        onBlur={handleBlur}  
      />
 
      {errors.email && (
        <span className='text-red-600 py-3'>{errors.email}</span>
      )}
    </div> 
  );
};

export default ForgottenPass;
