import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFilm, FaBars, FaTimes } from 'react-icons/fa';
import user from '../../../public/user-1.png';
import search_home from '../../../public/Search.png';
import { debounce } from 'lodash';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState(() => {
    const params = new URLSearchParams(location.search);
    return decodeURIComponent(params.get('query') || '');
  });

  // Sync state with URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearch(decodeURIComponent(params.get('query') || ''));
  }, [location.search]);

  // Auto-search when `search` changes (with debounce)
  useEffect(() => {
    const delayedSearch = debounce((query) => {
      if (query.trim()) {
        navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      }
    }, 100); // adjust debounce time here

    delayedSearch(search);
    return () => delayedSearch.cancel(); // cleanup on unmount
  }, [search]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`bg-dark-navy sticky top-0 z-50 border-b-2 border-light-white shadow-md transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md bg-dark-navy/50' : ''
      }`}
    >
      <div className="mx-auto px-4 py-3 flex flex-wrap gap-4 items-center justify-between">
        {/* Logo and Nav */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <FaFilm className="text-light-orange text-3xl" />
            <h1 className="text-gray-100 text-2xl font-semibold">
              Movie<span className="text-light-orange">Hub</span>
            </h1>
          </Link>

          <nav className="hidden md:flex gap-6 items-center">
            {['/', '/movies', '/tv-shows'].map((path, i) => (
              <Link
                key={path}
                to={path}
                className={`${
                  isActive(path)
                    ? 'text-light-orange'
                    : 'text-light-white hover:text-light-orange'
                }`}
              >
                {['Home', 'Movies', 'TV Shows'][i]}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search + User */}
        <div className="flex items-center gap-4">
          <form
            className="hidden sm:flex items-center gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              className="bg-slate-800 text-light-white px-4 py-1.5 rounded-full w-40 sm:w-56 focus:outline-none focus:ring-2 focus:ring-light-orange transition-all duration-300 text-sm"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">
              <img src={search_home} alt="Search Icon" className="w-5 h-5" />
            </button>
          </form>

          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img src={user} alt="user" className="w-full h-full object-cover" />
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-light-orange text-2xl"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Search */}
        <form
          className="sm:hidden w-full mt-2 flex items-center gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="bg-slate-800 text-light-white px-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-light-orange text-sm"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">
            <img src='/search.png' alt="Search Icon" className="w-5 h-5" />
          </button>
        </form>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-slate-700 px-4 pb-4">
          <ul className="flex flex-col space-y-4 items-center mt-4">
            {['/', '/movies', '/tv-shows'].map((path, i) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`${
                    isActive(path)
                      ? 'text-light-orange'
                      : 'text-light-white hover:text-light-orange'
                  }`}
                  onClick={toggleMenu}
                >
                  {['Home', 'Movies', 'TV Shows'][i]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
