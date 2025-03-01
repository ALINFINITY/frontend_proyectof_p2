const API_URL = 'http://localhost:3000'; //Ruta General del Backend

export const fetchAPI = async (endpoint:string,options:RequestInit={})=>{
    const response = await fetch(`${API_URL}${endpoint}`,{
        headers:{
            'Content-Type':'application/json',
            ...options.headers,
        },
        ...options,
    
    });

    if(!response.ok){
        throw new Error(`Error en la petición: ${response.statusText}`)
    }

    return response.json();
}