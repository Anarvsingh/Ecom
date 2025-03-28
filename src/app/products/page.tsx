'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ProductGrid } from '@/components/ProductGrid'
import { products, getProductsByCategory, categories } from '@/lib/data'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const [filter, setFilter] = useState<string | null>(categoryParam)
  const [filteredProducts, setFilteredProducts] = useState(products)
  
  useEffect(() => {
    setFilter(categoryParam)
  }, [categoryParam])
  
  useEffect(() => {
    if (filter) {
      setFilteredProducts(getProductsByCategory(filter))
    } else {
      setFilteredProducts(products)
    }
  }, [filter])
  
  const handleCategoryChange = (category: string | null) => {
    setFilter(category)
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      
      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              !filter ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === category.slug ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Results */}
      <div>
        <p className="mb-4 text-gray-600">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>
        
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="text-center py-16">
            <h3 className="text-lg font-medium">No products found</h3>
            <p className="text-gray-500 mt-2">
              Try changing your filters or check back later for new products.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 