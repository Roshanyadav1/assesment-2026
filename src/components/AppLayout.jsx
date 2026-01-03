import { Link, useLocation, Outlet, ScrollRestoration } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { selectFavoritesCount } from "../redux/slices/favoritesSlice";

const AppLayout = () => {
  const { pathname } = useLocation();
  const wishlistCount = useAppSelector(selectFavoritesCount);

  const navigation = [
    { label: "Collection", path: "/", isActive: pathname === "/" },
    {
      label: "Wishlist",
      path: "/favorites",
      isActive: pathname === "/favorites",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-zinc-900 selection:text-white flex flex-col">
      <ScrollRestoration />

      <div className="fixed top-0 left-0 w-full h-[2px] bg-zinc-100 z-[60]">
        <div
          className="h-full bg-zinc-900 transition-all duration-500 ease-out"
          style={{ width: "100%", opacity: 0 }}
        />
      </div>

      {/* Global Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center h-20">
            {/* Brand Logo */}
            <Link to="/" className="group relative">
              <h1 className="text-xl font-black tracking-tighter text-zinc-900 uppercase">
                Studio
                <span className="text-zinc-400 group-hover:text-zinc-900 transition-colors duration-500">
                  Shop
                </span>
              </h1>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-12">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`group relative py-1 text-[10px] font-bold uppercase tracking-[0.25em] transition-all ${
                    item.isActive
                      ? "text-zinc-900"
                      : "text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  {item.label}
                  {/* High-end animated underline */}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1.5px] bg-zinc-900 transition-all duration-500 ${
                      item.isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />

                  {item.label === "Wishlist" && wishlistCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-[9px] font-bold text-white bg-zinc-900 rounded-full tabular-nums">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center">
              <Link
                to="/favorites"
                className="relative p-2 text-zinc-900 active:scale-90 transition-transform"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[8px] font-bold text-white ring-2 ring-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="border-t border-zinc-100 py-16 bg-zinc-50/30">
        <div className="max-w-[1440px] mx-auto px-4 text-center space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-900">
            Studio Shop
          </h2>
          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-400">
            Crafting excellence since 2022
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
