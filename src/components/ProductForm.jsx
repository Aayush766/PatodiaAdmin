import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ProductForm = ({ product, onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (product) {
            setTitle(product.title);
            setDescription(product.description);
            setPreview(product.imageSrc);
        }
    }, [product]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            toast.error('Title and description are required.');
            return;
        }
        onSubmit({ title, description, image });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>
            <div>
                <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-1">
                    Product Image
                </label>
                <div className="mt-1 flex items-center space-x-4">
                    {preview && <img src={preview} alt="Preview" className="w-20 h-20 object-cover rounded-md" />}
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                </div>
                {product && <p className="text-xs text-slate-500 mt-2">Leave blank to keep the current image.</p>}
            </div>
            <div className="flex justify-end pt-4 space-x-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-white text-slate-700 px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-50 font-semibold"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-semibold"
                >
                    {product ? 'Update Product' : 'Create Product'}
                </button>
            </div>
        </form>
    );
};

export default ProductForm;