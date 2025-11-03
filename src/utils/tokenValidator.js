/* eslint-disable no-unused-vars */

import { jwtDecode } from 'jwt-decode';

// export const verifyToken = (token) => {
//   if (!token) return null;
  
//   try {
//     // Decode the token to check its contents
//     const decoded = jwtDecode(token);
//     console.log("🛠 Decoded Token:", decoded); 
//     // Check if token is expired
//     const currentTime = Date.now() / 1000;
//     if (decoded.exp && decoded.exp < currentTime) {
//       return null;
//     }
    

//     // Return user information from the token
//     return {
//       userId: decoded.id,
//       full_name: decoded.full_name,
//       username: decoded.username,
//       role: decoded.role,
//       email: decoded.email
//     };
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     return null;
//   }
// };
export const verifyToken = (token) => {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      return null;
    }

    return {
      userId: decoded.id,
      full_name: decoded.full_name,  // Pastikan ini ada
      username: decoded.username,
      role: decoded.role,
      email: decoded.email
    };
  } catch (error) {
  
    return null;
  }
};
