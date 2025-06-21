import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { setInput } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setInput(searchTerm.trim());
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm, setInput]);

  const onClear = () => {
    setSearchTerm('');
    setInput('');
  };

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} className="w-2.5" alt="star icon" />
        </div>

        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700">
          Your own <span className="text-primary">blogging</span> <br />
          platform.
        </h1>

        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500">
          This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative max-w-lg mx-auto max-sm:scale-75"
          role="search"
          aria-label="Search blogs"
        >
          <input
            type="text"
            placeholder="Search for blogs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-16 focus:outline-none focus:ring-2 focus:ring-primary transition"
            aria-describedby="clear-search"
          />

          {/* Clear button */}
          {searchTerm && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear search"
              id="clear-search"
              className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              style={{ fontSize: '1.25rem', lineHeight: 1 }}
            >
              &times;
            </button>
          )}

          {/* Search button with icon */}
          <button
            type="submit"
            disabled
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent text-primary rounded-full p-1 cursor-default opacity-60"
            aria-disabled="true"
          >
            🔍
          </button>
        </form>

      </div>
    </div>
  );
};

export default Header;
