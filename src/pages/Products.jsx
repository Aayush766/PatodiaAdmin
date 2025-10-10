import React, { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Modal from '../components/Modal'; 
import ProductForm from '../components/ProductForm';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            const { data } = await getProducts();
            setProducts(data);
        } catch (error) {
            toast.error("Failed to fetch products.");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleFormSubmit = async (productData) => {
        try {
            const formData = new FormData();
            formData.append('title', productData.title);
            formData.append('description', productData.description);
            if (productData.image) {
                formData.append('image', productData.image);
            }

            if (selectedProduct) {
                await updateProduct(selectedProduct._id, formData);
                toast.success("Product updated successfully!");
            } else {
                await createProduct(formData);
                toast.success("Product created successfully!");
            }
            fetchProducts();
            closeModal();
        } catch (error) {
            toast.error("Failed to save product.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id);
                toast.success("Product deleted successfully!");
                fetchProducts();
            } catch (error) {
                toast.error("Failed to delete product.");
            }
        }
    };

    const openModal = (product = null) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-slate-800">Products</h1>
                <button onClick={() => openModal()} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700 font-semibold">
                    <Plus size={20} className="mr-2" /> Add Product
                </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Image</th>
                            <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                            <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {products.map(product => (
                            <tr key={product._id} className="hover:bg-slate-50">
                                <td className="p-4"><img src={product.imageSrc} alt={product.title} className="w-16 h-16 object-cover rounded-md"/></td>
                                <td className="p-4 font-medium text-slate-700">{product.title}</td>
                                <td className="p-4">
                                    <button onClick={() => openModal(product)} className="text-slate-500 hover:text-indigo-600 p-2"><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(product._id)} className="text-slate-500 hover:text-red-600 p-2"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <Modal title={selectedProduct ? "Edit Product" : "Add Product"} onClose={closeModal}>
                    <ProductForm product={selectedProduct} onSubmit={handleFormSubmit} onCancel={closeModal} />
                </Modal>
            )}
        </div>
    );
};

export default Products;