// src/pages/admin/promotions/Promotions.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const categories = [
  { key:'Electronics', color:'from-indigo-500 to-blue-600', image:'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1200&auto=format&fit=crop', blurb:'Gadgets, accessories & more' },
  { key:'Travel', color:'from-sky-500 to-cyan-600', image:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop', blurb:'Flights, hotels, cabs' },
  { key:'Cooking', color:'from-emerald-500 to-mint-600', image:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop', blurb:'Cookware & kitchen tools' },
  { key:'Fashion', color:'from-fuchsia-500 to-pink-600', image:'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop', blurb:'Apparel, shoes, accessories' },
  { key:'Grocery', color:'from-lime-500 to-green-600', image:'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop', blurb:'Daily essentials & pantry' },
  { key:'Books', color:'from-orange-500 to-amber-600', image:'https://images.unsplash.com/photo-1519681393784-7f0b6d3f89f2?q=80&w=1200&auto=format&fit=crop', blurb:'Fiction, non-fiction, study' },
  { key:'Sports', color:'from-red-500 to-rose-600', image:'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop', blurb:'Gear, apparel & fitness' },
  { key:'Cabs', color:'from-teal-500 to-emerald-600', image:'https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=1200&auto=format&fit=crop', blurb:'City & intercity rides' },
];

export default function Promotions() {
  return (
    <div className="container-responsive space-y-6">
      {/* Banner Section */}
      <section className="card card-padding flex flex-col sm:flex-row items-center gap-4">
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop"
          alt="Create Campaign"
          className="w-full sm:w-48 h-36 object-cover rounded-md shadow-sm"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Create Campaign</h3>
          <p className="text-sm text-gray-600 mt-1">Quickly design and launch a new promotional campaign. Attach audiences, set discounts and preview before publishing.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {/* CORRECTED LINK: Points to /admin/campaign-builder */}
            <Link
              to="/admin/campaign-builder"
              className="btn-primary btn-lg"
            >
              Create Campaign
            </Link>
            <NavLink
              to="/admin/analytics"
              className="btn-outline btn-lg"
            >
              Analytics
            </NavLink>
          </div>
        </div>
      </section>

      {/* Category Highlights */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Highlight Categories</h2>
          <NavLink to="/offers" className="btn-outline btn-lg">View All Offers</NavLink>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((c) => (
            <div key={c.key} className="card overflow-hidden group">
              <div className="relative">
                <img src={c.image} alt={c.key} className="card-image h-40 sm:h-44" />
                <div className={`absolute inset-0 bg-gradient-to-t ${c.color} opacity-80`} />
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <div className="inline-flex items-center gap-2 bg-white/85 rounded-full px-3 py-1 text-xs text-gray-800 shadow-soft">
                    <span>🏷️</span><span>{c.key}</span>
                  </div>
                  <p className="mt-2 text-white/90 text-sm">{c.blurb}</p>
                </div>
              </div>
              <div className="card-padding flex items-center justify-between">
                <Link
                  to="/admin/campaign-builder"
                  state={{ category: c.key }}
                  className="btn-primary btn-lg"
                >
                  Create Offer
                </Link>
                <NavLink to="/admin/analytics" className="btn-outline btn-lg">Preview</NavLink>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}