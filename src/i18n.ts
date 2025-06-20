import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // General
      General: {
        signIn: "Sign In",
        login: "Login",
        loginFailed: "Login failed",
        errorServer: "Error connecting to server",
        close: "Close",
        loading: "Loading...",
        cancel: "Cancel",
        update: "Update",
        create: "Create",
        edit: "Edit",
        delete: "Delete",
        actions: "Actions",
        paginationPrevious: "Previous",
        paginationNext: "Next",
        logout: "Log out"
      },
      // Login
      Login: {
        email: "Email",
        password: "Password",
        emailRequired: "Email is required",
        emailInvalid: "Invalid email format",
        passwordRequired: "Password is required",
        passwordMin: "Password must be at least 6 characters"
      },
      // Sidebar
      Sidebar: {
        products: "Products",
        productCategories: "Product Categories",
        users: "Users"
      },
      // Product
      Product: {
        products: "Products",
        addProduct: "Add Product",
        editProduct: "Edit Product",
        addProductForm: "Add Product",
        nameLabel: "Name",
        nameRequired: "Name is required",
        descriptionLabel: "Description",
        descriptionRequired: "Description is required",
        categoryLabel: "Category",
        categoryRequired: "Category is required",
        selectCategory: "Select category",
        productCreated: "Product created successfully",
        productUpdated: "Product updated successfully",
        productDeleted: "Product deleted successfully",
        noProductsFound: "No products found",
        failedToLoadProducts: "Failed to load products",
        deleteProductTitle: "Delete Product",
        deleteProductMessage: "Are you sure you want to delete {{name}}?",
        deleteProductConfirm: "Delete",
        deleteProductCancel: "Cancel"
      },
      // Category
      Category: {
        productCategories: "Product Categories",
        addCategory: "Add Category",
        editCategory: "Edit Category",
        actionsCategory: "Actions",
        noCategoriesFound: "No categories found.",
        categoryCreated: "Category created successfully",
        categoryUpdated: "Category updated successfully",
        categoryDeleted: "Category deleted successfully",
        errorFetchingCategories: "Error fetching categories",
        errorCreatingCategory: "Error creating category",
        errorUpdatingCategory: "Error updating category",
        errorDeletingCategory: "Error deleting category",
        deleteCategoryTitle: "Delete Category",
        deleteCategoryMessage: "Are you sure you want to delete \"{{name}}\"?",
        editCategoryForm: "Edit Category",
        addCategoryForm: "Add Category",
        nameCategoryLabel: "Name",
        nameCategoryRequired: "Name is required",
        descriptionCategoryLabel: "Description",
        descriptionCategoryRequired: "Description is required",
        cancelCategory: "Cancel",
        updateCategory: "Update",
        createCategory: "Create"
      },
      // User
      User: {
        users: "Users",
        addUser: "Add User",
        editUser: "Edit User",
        createUser: "Create User",
        userCreated: "User created successfully",
        userUpdated: "User updated successfully",
        userDeleted: "User deleted successfully",
        deleteUserTitle: "Delete User",
        deleteUserMessage: "Are you sure you want to delete {{name}}?",
        deleteUserConfirm: "Delete",
        deleteUserCancel: "Cancel",
        firstNameLabel: "First Name",
        firstNameRequired: "First name is required",
        lastNameLabel: "Last Name",
        lastNameRequired: "Last name is required",
        emailLabel: "Email",
        emailRequired: "Email is required",
        emailInvalid: "Invalid email format",
        phoneLabel: "Phone",
        phoneRequired: "Phone is required",
        phoneInvalid: "Invalid phone number",
        passwordLabel: "Password",
        passwordRequired: "Password is required",
        passwordMin: "Password must be at least 6 characters",
        cancelUser: "Cancel",
        updateUser: "Update",
        createUserBtn: "Create",
        noUsersFound: "No users found."
      }
    }
  },
  es: {
    translation: {
      // General
      General: {
        signIn: "Iniciar sesión",
        login: "Entrar",
        loginFailed: "Inicio de sesión fallido",
        errorServer: "Error al conectar con el servidor",
        close: "Cerrar",
        loading: "Cargando...",
        cancel: "Cancelar",
        update: "Actualizar",
        create: "Crear",
        edit: "Editar",
        delete: "Eliminar",
        actions: "Acciones",
        paginationPrevious: "Anterior",
        paginationNext: "Siguiente",
        logout: "Cerrar sesión"
      },
      // Login
      Login: {
        email: "Correo electrónico",
        password: "Contraseña",
        emailRequired: "El correo es obligatorio",
        emailInvalid: "Formato de correo inválido",
        passwordRequired: "La contraseña es obligatoria",
        passwordMin: "La contraseña debe tener al menos 6 caracteres"
      },
      // Sidebar
      Sidebar: {
        products: "Productos",
        productCategories: "Categorías",
        users: "Usuarios"
      },
      // Product
      Product: {
        products: "Productos",
        addProduct: "Agregar producto",
        editProduct: "Editar producto",
        addProductForm: "Agregar producto",
        nameLabel: "Nombre",
        nameRequired: "El nombre es obligatorio",
        descriptionLabel: "Descripción",
        descriptionRequired: "La descripción es obligatoria",
        categoryLabel: "Categoría",
        categoryRequired: "La categoría es obligatoria",
        selectCategory: "Selecciona una categoría",
        productCreated: "Producto creado exitosamente",
        productUpdated: "Producto actualizado exitosamente",
        productDeleted: "Producto eliminado exitosamente",
        noProductsFound: "No se encontraron productos",
        failedToLoadProducts: "No se pudieron cargar los productos",
        deleteProductTitle: "Eliminar producto",
        deleteProductMessage: "¿Seguro que deseas eliminar {{name}}?",
        deleteProductConfirm: "Eliminar",
        deleteProductCancel: "Cancelar"
      },
      // Category
      Category: {
        productCategories: "Product Categories",
        addCategory: "Agregar categoría",
        editCategory: "Editar categoría",
        actionsCategory: "Acciones",
        noCategoriesFound: "No se encontraron categorías.",
        categoryCreated: "Categoría creada exitosamente",
        categoryUpdated: "Categoría actualizada exitosamente",
        categoryDeleted: "Categoría eliminada exitosamente",
        errorFetchingCategories: "Error al obtener las categorías",
        errorCreatingCategory: "Error al crear la categoría",
        errorUpdatingCategory: "Error al actualizar la categoría",
        errorDeletingCategory: "Error al eliminar la categoría",
        deleteCategoryTitle: "Eliminar categoría",
        deleteCategoryMessage: "¿Seguro que deseas eliminar \"{{name}}\"?",
        editCategoryForm: "Editar categoría",
        addCategoryForm: "Agregar categoría",
        nameCategoryLabel: "Nombre",
        nameCategoryRequired: "El nombre es obligatorio",
        descriptionCategoryLabel: "Descripción",
        descriptionCategoryRequired: "La descripción es obligatoria",
        cancelCategory: "Cancelar",
        updateCategory: "Actualizar",
        createCategory: "Crear"
      },
      // User
      User: {
        users: "Usuarios",
        addUser: "Agregar usuario",
        editUser: "Editar usuario",
        createUser: "Crear usuario",
        userCreated: "Usuario creado exitosamente",
        userUpdated: "Usuario actualizado exitosamente",
        userDeleted: "Usuario eliminado exitosamente",
        deleteUserTitle: "Eliminar usuario",
        deleteUserMessage: "¿Seguro que deseas eliminar {{name}}?",
        deleteUserConfirm: "Eliminar",
        deleteUserCancel: "Cancelar",
        firstNameLabel: "Nombre",
        firstNameRequired: "El nombre es obligatorio",
        lastNameLabel: "Apellido",
        lastNameRequired: "El apellido es obligatorio",
        emailLabel: "Correo electrónico",
        emailRequired: "El correo es obligatorio",
        emailInvalid: "Formato de correo inválido",
        phoneLabel: "Teléfono",
        phoneRequired: "El teléfono es obligatorio",
        phoneInvalid: "Número de teléfono inválido",
        passwordLabel: "Contraseña",
        passwordRequired: "La contraseña es obligatoria",
        passwordMin: "La contraseña debe tener al menos 6 caracteres",
        cancelUser: "Cancelar",
        updateUser: "Actualizar",
        createUserBtn: "Crear",
        noUsersFound: "No se encontraron usuarios."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;