var o=s=>{let a=s.get("password"),r=s.get("confirmPassword");return a&&r&&a.value!==r.value?(r.setErrors({passwordMismatch:!0}),{passwordMismatch:!0}):null};export{o as a};
