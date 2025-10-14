import axios from 'axios';

const API = axios.create({ baseURL: 'https://patodiaexportsbackend.onrender.com/api' });

API.interceptors.request.use((req) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        req.headers.Authorization = `Bearer ${authToken}`;
    }
    return req;
});

export const getProducts = () => API.get('/products');
export const createProduct = (productData) => API.post('/products', productData);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);


export const getMessages = () => API.get('/contact');
export const deleteMessage = (id) => API.delete(`/contact/${id}`); 


export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const setPassword = (passwordData) => API.put('/users/set-password', passwordData);
