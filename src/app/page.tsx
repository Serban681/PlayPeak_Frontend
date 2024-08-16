'use client'

import { TagSystem } from "@/components/styled-components/Buttons";
import { CustomDropdown } from "@/components/styled-components/CustomDropdown";
import ProductCard from "@/components/styled-components/ProductCard";
import { SectionTitle } from "@/components/styled-components/SectionTitle";
import { ProductSortMethods } from "@/enums/ProductsSortMethods";
import { RootState } from "@/store/store";
import { selectUser } from "@/store/userSlice";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();

  // const user = useSelector(selectUser);

  const [tags, setTags] = useState<string[]>(["Home", "About", "Contact"]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const handleTagSelection = (tag: string) => {
    if(selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  }

  const [sortingMethod, setSortingMethod] = useState<string>(ProductSortMethods.NEWEST);

  return (
    <>
      {/* <h1>Home page</h1>
      <button className="border-2" onClick={() => router.push('/create-user')}>Create user</button>
      <br />
      <button className="border-2" onClick={() => router.push('/login')}>Login</button> */}
      {/* <br /> */}
      {/* <button className="border-2" onClick={() => router.push('/add-product')}>Add Product</button> */}
      {/* <br /><br /> */}
      {/* {user && <div>Logged in as: {user.id}</div>} */}
      
      {/* <TagBtn text="Home" selected={false} handleClick={() => console.log('clicked')} /> */}

      <div className="sm:mt-10">
        <TagSystem 
          tags={tags} 
          selectedTags={selectedTags} 
          handleTagSelection={handleTagSelection} 
          customStyles="inline-block sm:w-3/5 md:w-8/12 lg:w-9/12 2xl:w-11/12" />

        <CustomDropdown customStyles="sm:float-right" label={'Sort by'} name={'sort_dropdown'} options={Object.values(ProductSortMethods)} selected={sortingMethod} handleSelect={(name, selected) => setSortingMethod(selected)} />
        <SectionTitle customStyles="my-3">Clothes</SectionTitle>
        
        <ProductCard  />
      </div>
    </>
  );
}
