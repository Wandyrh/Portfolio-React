import { useEffect, useState } from "react";
import {
  getProductsPaged,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import { getProductCategories } from "../services/productCategoryService";
import type { ProductDto } from "../dtos/ProductDtos";
import type { ProductCategoryDto } from "../dtos/ProductCategoryDtos";
import ProductForm from "../components/ProductForm";
import ConfirmModal from "../components/ConfirmModal";

const PAGE_SIZE = 5;

const Products = () => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [categories, setCategories] = useState<ProductCategoryDto[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [editProduct, setEditProduct] = useState<ProductDto | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setError(null);
      const res = await getProductsPaged(page, PAGE_SIZE);
      if (res && res.data) {
        setProducts(res.data.items);
        setTotalPages(res.data.totalPages);
      } else {
        setProducts([]);
        setTotalPages(1);
        setError("No products found.");
      }
    } catch (err: any) {
      setProducts([]);
      setTotalPages(1);
      setError("Failed to load products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    getProductCategories().then((res) => {
      if (res && res.data) setCategories(res.data);
      else setCategories([]);
    });
  }, []);

  const handleAddProduct = () => {
    setFormMode("create");
    setEditProduct(null);
    setModalOpen(true);
  };

  const handleEditProduct = (product: ProductDto) => {
    setFormMode("edit");
    setEditProduct(product);
    setModalOpen(true);
  };

  const handleFormCancel = () => setModalOpen(false);

  const handleFormSubmit = async (data: any) => {
    if (formMode === "create") {
      const result = await createProduct(data);
      setModalOpen(false);
      if (result && result.success) {
        setToast("Product created successfully");
        fetchProducts();
      }
    } else if (formMode === "edit" && editProduct) {
      const result = await updateProduct(editProduct.id, { ...data, id: editProduct.id });
      setModalOpen(false);
      if (result && result.success) {
        setToast("Product updated successfully");
        fetchProducts();
      }
    }
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div>
      {toast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in flex items-center gap-4 min-w-[250px] max-w-[90vw]">
          <span className="flex-1">{toast}</span>
          <button
            className="ml-2 text-white font-bold hover:text-gray-200 focus:outline-none"
            onClick={() => setToast(null)}
            aria-label="Close"
            type="button"
          >
            ×
          </button>
        </div>
      )}
      {error && (
        <div className="my-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}
      <ConfirmModal
        open={deleteModalOpen}
        title="Delete Product"
        message={
          productToDelete
            ? `Are you sure you want to delete ${productToDelete.name}?`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={async () => {
          if (productToDelete) {
            await deleteProduct(productToDelete.id);
            setDeleteModalOpen(false);
            setProductToDelete(null);
            setToast("Product deleted successfully");
            fetchProducts();
          }
        }}
      />
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-3 tracking-tight text-react-dark relative">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="inline text-react">
            <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
            <rect x="7" y="3" width="10" height="4" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <span>
            Products
            <span className="block w-12 h-1 bg-react rounded mt-2"></span>
          </span>
        </h2>
        <button
          className="flex items-center gap-2 bg-react text-white font-semibold px-5 py-2 rounded-xl shadow transition-all duration-200 hover:bg-[#1fc8f8] hover:shadow-lg hover:scale-105 active:scale-100"
          onClick={handleAddProduct}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative animate-fade-in">
            <ProductForm
              mode={formMode}
              initialValues={editProduct || undefined}
              categories={categories}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      )}
      <div className="overflow-x-auto rounded-lg shadow mb-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-5 border-b bg-react text-white font-semibold text-left rounded-tl-lg shadow-sm">
                Name
              </th>
              <th className="py-3 px-5 border-b bg-react text-white font-semibold text-left shadow-sm">
                Category
              </th>
              <th className="py-3 px-5 border-b bg-react text-white font-semibold text-left shadow-sm">
                Description
              </th>
              <th className="py-3 px-5 border-b bg-react text-white font-semibold text-center rounded-tr-lg shadow-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && !error ? (
              <tr>
                <td colSpan={4} className="py-6 px-4 text-center text-gray-400">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product, idx) => (
                <tr
                  key={product.id}
                  className={`transition-colors ${
                    idx % 2 === 0 ? "bg-white" : "bg-cyan-50"
                  } hover:bg-cyan-100`}
                >
                  <td className="py-3 px-5 border-b border-gray-100 font-medium text-gray-700">
                    {product.name}
                  </td>
                  <td className="py-3 px-5 border-b border-gray-100 text-gray-700">
                    {product.categoryName}
                  </td>
                  <td className="py-3 px-5 border-b border-gray-100 text-gray-700">
                    {product.description}
                  </td>
                  <td className="py-3 px-5 border-b border-gray-100 text-center">
                    <button
                      className="inline-flex items-center justify-center p-2 rounded hover:bg-blue-50 mr-2"
                      title="Edit"
                      onClick={() => handleEditProduct(product)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 019 17H7v-2a2 2 0 01.586-1.414z" />
                      </svg>
                    </button>
                    <button
                      className="inline-flex items-center justify-center p-2 rounded hover:bg-red-50"
                      title="Delete"
                      onClick={() => {
                        setProductToDelete(product);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="5" y="7" width="10" height="8" rx="2" stroke="#ef4444" strokeWidth="2" fill="none"/>
                        <path d="M8 9v4M12 9v4" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
                        <rect x="7" y="4" width="6" height="3" rx="1" stroke="#ef4444" strokeWidth="2" fill="none"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center gap-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-3 py-1">{page} / {totalPages}</span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;