import React from 'react'
import Form from "next/form"
import SearchFormReset from './SearchFormReset';
import { Search } from 'lucide-react';

const SearchForm = ({query} : {query?: string}) => {
  return (
    <Form action="/" scroll={false} className='search-form'>
        <input name='query' defaultValue={query} placeholder='Search startups, founders, or topics...' className='search-input'/>

        <div className='flex gap-2'>
            {/* Button is client side comp so we made its another comp and import it here and added use client*/}
            {query && <SearchFormReset/> }

            <button type='submit' className='search-btn text-white'>
                <Search className='size-5'/>
                </button>
        </div>

    </Form>
  )
}

export default SearchForm
