import { useEffect, useState } from "react";
import CategoryForm from "../components/CategoryForm";
import {
  getProductCategoriesPaged,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
} from "../services/productCategoryService";
import type { ProductCategoryDto, CreateProductCategoryDto, UpdateProductCategoryDto } from "../dtos/ProductCategoryDtos";
import ConfirmModal from "../components/ConfirmModal";

const PAGE_SIZE = 5;

const ProductCategory = () => {
  const [categories, setCategories] = useState<ProductCategoryDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selected, setSelected] = useState<ProductCategoryDto | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [toast, setToast] = useState<string | null>(null);
  const [formInitialValues, setFormInitialValues] = useState<Partial<ProductCategoryDto>>({});

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    const res = await getProductCategoriesPaged(page, PAGE_SIZE);
    if (res.success && res.data) {
      setCategories(res.data.items);
      setTotalPages(res.data.totalPages);
    } else {
      setCategories([]);
      setTotalPages(1);
      setError(res.message || "Error fetching categories");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories(); 
  }, [page]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleOpenCreate = () => {
    setFormInitialValues({ name: "", description: "" });
    setEditMode(false);
    setShowModal(true);
  };

  const handleOpenEdit = (cat: ProductCategoryDto) => {
    setFormInitialValues({ name: cat.name, description: cat.description, id: cat.id });
    setSelected(cat);
    setEditMode(true);
    setShowModal(true);
  };

  const handleFormSubmit = async (data: CreateProductCategoryDto | UpdateProductCategoryDto) => {
    setLoading(true);
    if (editMode && selected) {
      const updateDto: UpdateProductCategoryDto = { ...data, id: selected.id };
      const res = await updateProductCategory(selected.id, updateDto);
      if (res.success) {
        fetchCategories();
        setShowModal(false);
        setToast("Category updated successfully");
      } else {
        setError(res.message || "Error updating category");
      }
    } else {
      const res = await createProductCategory(data as CreateProductCategoryDto);
      if (res.success) {
        fetchCategories();
        setShowModal(false);
        setToast("Category created successfully");
      } else {
        setError(res.message || "Error creating category");
      }
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!selected) return;
    setLoading(true);
    const res = await deleteProductCategory(selected.id);
    if (res.success) {
      fetchCategories();
      setShowConfirm(false);
      setToast("Category deleted successfully");
    } else {
      setError(res.message || "Error deleting category");
    }
    setLoading(false);
  };

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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-extrabold flex items-center gap-3 tracking-tight text-react-dark relative">
          <svg width="36" height="36" viewBox="0 0 20 20" fill="none" className="inline text-react">
            <path d="M3 7l7-4 7 4v6c0 3.3137-2.6863 6-6 6s-6-2.6863-6-6V7z" stroke="currentColor" strokeWidth="2" fill="none"/>
            <circle cx="10" cy="11" r="2.5" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <span>
            Product Categories
            <span className="block w-12 h-1 bg-react rounded mt-2"></span>
          </span>
        </h2>
        <button
          className="flex items-center gap-2 bg-react text-white font-semibold px-5 py-2 rounded-xl shadow transition-all duration-200 hover:bg-[#1fc8f8] hover:shadow-lg hover:scale-105 active:scale-100"
          onClick={handleOpenCreate}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Category
        </button>
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow mb-4">
          <table className="min-w-full bg-gradient-to-br from-white via-gray-50 to-gray-100 border border-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-5 border-b bg-react text-white font-semibold text-left rounded-tl-lg shadow-sm">
                  Name
                </th>
                <th className="py-3 px-5 border-b bg-react text-white font-semibold text-center rounded-tr-lg shadow-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={2} className="py-6 px-4 text-center text-gray-400">
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((cat, idx) => (
                  <tr
                    key={cat.id}
                    className={`transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-cyan-50"
                    } hover:bg-cyan-100`}
                  >
                    <td className="py-3 px-5 border-b border-gray-100 font-medium text-gray-700">
                      {cat.name}
                    </td>
                    <td className="py-3 px-5 border-b border-gray-100 text-center">
                      <button
                        className="inline-flex items-center justify-center p-2 rounded hover:bg-blue-50 mr-2"
                        title="Edit"
                        onClick={() => handleOpenEdit(cat)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 019 17H7v-2a2 2 0 01.586-1.414z" />
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center p-2 rounded hover:bg-red-50"
                        title="Delete"
                        onClick={() => { setSelected(cat); setShowConfirm(true); }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m5 0H4" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in">
            <CategoryForm
              mode={editMode ? "edit" : "create"}
              initialValues={formInitialValues}
              onSubmit={handleFormSubmit}
              onCancel={() => setShowModal(false)}
              loading={loading}
            />
          </div>
        </div>
      )}

      {showConfirm && selected && (
        <ConfirmModal
          open={showConfirm}
          title="Delete Category"
          message={`Are you sure you want to delete "${selected.name}"?`}
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default ProductCategory;