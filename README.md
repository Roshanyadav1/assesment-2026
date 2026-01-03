# StudioShop — Professional E-Commerce UI

A minimalist, high-performance product gallery built with **React 18**, **Redux Toolkit**, and **Tailwind CSS**. This project focuses on "slick" micro-interactions, robust state management, and an architectural aesthetic.



## 🚀 Key Features

- **Slick UI/UX:** Minimalist "Ghost" design system with zero-animation focus states and backdrop-blur navigation.
- **Robust State Management:** Centralized filtering logic (Search, Category, Sort) using Redux Toolkit Matchers and unified actions.
- **Performance Optimized:** - **Lazy Loading:** Route-based code splitting with React Suspense.
  - **Shimmer Loading:** Custom skeleton components to prevent layout shift.
  - **Debounced Search:** High-accuracy search filtering to minimize Redux updates.
- **Responsive Architecture:** Adaptive Sidebar-to-Accordion filter panels for mobile and desktop consistency.
- **Scroll Restoration:** Intelligent browser history management for a seamless navigation experience.

---

## 🛠 Tech Stack

| Tool | Purpose |
| :--- | :--- |
| **React 18** | UI Library (Functional Components & Hooks) |
| **Redux Toolkit** | Centralized Global State & Async Logic |
| **Tailwind CSS** | Atomic CSS Framework for Slick Styling |
| **React Router 6** | Modern Data-Browser Routing |
| **FakeStore API** | REST API for Product Data |

---

## 📂 Architecture & Naming Conventions

This project follows **Robust Naming Conventions** to ensure the codebase remains maintainable and clean:

- **Items/Collection:** We use generic "Item" terminology in Redux for reusability.
- **Unified Filters:** All UI changes (Search, Sort, Category) flow through a single `updateFilters` action.
- **Status Enums:** Using `idle | loading | error` instead of simple booleans for better UI feedback.



---

## ⚡ Getting Started

### 1. Clone & Install
```bash
git clone [https://github.com/yourusername/assesment-2026.git](https://github.com/yourusername/assesment-2026.git)
cd assesment-2026
npm install
npm run dev
 
