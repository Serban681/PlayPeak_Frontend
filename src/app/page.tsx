'use client'

import HeroItems from "@/components/3D-scene/HeroItems";
import { TagSystem } from "@/components/styled-components/Buttons";
import { CustomDropdown } from "@/components/styled-components/CustomDropdown";
import Hero from "@/components/styled-components/Hero";
import ProductCard from "@/components/styled-components/ProductCard";
import { SectionTitle } from "@/components/styled-components/SectionTitle";
import { getKeyByValue, ProductSortMethods } from "@/enums/ProductsSortMethods";
import { getAllCategories } from "@/lib/categoryRequests";
import { getAllProducts } from "@/lib/productRequests";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategorySelection = (category: string) => {
    if(!!selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(selectedCategory => selectedCategory !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  const [sortingMethod, setSortingMethod] = useState<string>(ProductSortMethods.NEWEST);

  useEffect(() => {
    getAllCategories()
      .then(res => res.map((category: Category) => category.name))
      .then(data => setCategories(data));
  }, [])

  const [categorisedProducts, setCategorisedProducts] = useState<{
    category: string,
    products: Product[]
  }[]>([]);

  useEffect(() => {
    getAllProducts(selectedCategories, getKeyByValue(sortingMethod))
      .then(res => setCategorisedProducts(res));
  }, [selectedCategories, sortingMethod])

  return (
    <>
      <Hero />
      {/* <Canvas camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 20, 20, 20 ]
        } }>
        <Hero />
      </Canvas> */}
      <div className="sm:mt-10">
        <TagSystem 
          tags={categories} 
          selectedTags={selectedCategories} 
          handleTagSelection={(category) => handleCategorySelection(category)} 
          customStyles="inline-block sm:w-3/5 md:w-8/12 lg:w-9/12 3xl:w-11/12" />

        <CustomDropdown customStyles="sm:float-right" label={'Sort by'} name={'sort_dropdown'} options={Object.values(ProductSortMethods)} selected={sortingMethod} handleSelect={(name, selected) => setSortingMethod(selected)} />
        
        {categorisedProducts.length > 0 ? 
          categorisedProducts.map((elem, index) => (
            <div key={index}>
              <SectionTitle customStyles="mt-8 mb-3">{elem.category}</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14">
                {elem.products.map(product => <ProductCard key={product.id} product={product} />)}
              </div>
            </div>
          ))
          : <div>Loading...</div>
        }
      </div>
    </>
  );
}
