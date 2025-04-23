import { BadgeCheck, LayoutDashboard, ShoppingBasketIcon } from "lucide-react";

export const registerFormControls = [
  {
    name: "name",
    label: "Fullname",
    placeholder: "Enter your fullname",
    componentType: "input",
    type: "name",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: ShoppingBasketIcon,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: BadgeCheck,
  },
];

export const addProductFormFields = [
  {
    label: "Title",
    name: "title",
    title: "Product Title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    title: "Product Description",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    title: "Product Category",
    componentType: "select",
    type: "select",
    placeholder: "Select a category",
    options: [
      { label: "Men", id: "men" },
      { label: "Women", id: "women" },
      { label: "Footwear", id: "footwear" },
      { label: "Kids", id: "kids" },
      { label: "Accessories", id: "accessories" },
      { label: "Others", id: "others" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    title: "Product Brand",
    componentType: "select",
    type: "select",
    placeholder: "Select a brand",
    options: [
      { label: "Nike", id: "nike" },
      { label: "Adidas", id: "adidas" },
      { label: "Puma", id: "puma" },
      { label: "Levi's", id: "levis" },
      { label: "Zara", id: "zara" },
      { label: "H&M", id: "hm" },
    ],
  },
  {
    label: "Price",
    name: "price",
    title: "Product Price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    title: "Discounted Price",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (if any)",
  },
  {
    label: "Total Stock",
    name: "stock",
    title: "Stock Quantity",
    componentType: "input",
    type: "number",
    placeholder: "Enter available stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },

  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "footware",
    label: "Footware",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
];
