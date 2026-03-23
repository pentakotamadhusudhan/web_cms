// Using the native fetch API

import type { LoginResponse } from "../models/user_model";


const baseUrl = "http://192.168.1.8:8000/";
const token = "";

export const LoginApi = async (username: string, password: string): Promise<LoginResponse | null> => {
    try {
        const req_body = {
            "username": username,
            "password": password
        };

        const response = await fetch(`${baseUrl}/users/auth/login/`, {
            method: 'POST', // Login must be POST
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req_body)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Login Failed:", errorData);
            throw new Error(errorData.message || 'Invalid credentials');
        }

        const data: LoginResponse = await response.json();

        // Save tokens to localStorage for future authenticated requests
        localStorage.setItem('access_token', data.tokens.access);
        localStorage.setItem('refresh_token', data.tokens.refresh);
        
        // Optional: Save user role for sidebar logic
        localStorage.setItem('user_role', data.user.role);

        console.log("Login successful, user is:", data.user.username);
        return data;

    } catch (e) {
        console.error("API Error in Login:", e);
        return null;
    }
}


export const getClinicDetails = async () => {
  const token =  localStorage.getItem('access_token');
  console.log("token",token);
  const response = await fetch(baseUrl + 'clinic/clinics/1/',{
      headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer "+ token
            },
  }); 
  
  if (!response.ok) throw new Error('Failed to fetch clinic data');

  // 1. You must CALL the function .json() with parentheses
  // 2. You must AWAIT it because it's an asynchronous operation
  const data = await response.json(); 

  console.log("API Data received:", data);

  return data; // Return the parsed data, not a new fetch call
};



// src/services/api_call.ts
export const LogoutApi = async () => {
    const refresh = localStorage.getItem('refresh_token');
    const access = localStorage.getItem('access_token');

    try {
        const req_body = {'refresh':refresh};
        console.log("refresh",req_body);
        await fetch('http://192.168.1.8:8000/users/auth/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            },
            body: JSON.stringify({ refresh })
        });
    } catch (e) {
        console.error("Logout API failed, proceeding with local cleanup", e);
    }
};