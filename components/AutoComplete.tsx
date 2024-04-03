'use client'

import { useSuggestions } from '@/hooks/useSuggestions';
import { useFormulaStore } from '@/store/store';
import { Suggestion } from '@/types/types';
import Autocomplete from 'react-autocomplete'
import React, { useState } from 'react'

const AutoComplete = ({ inputValue, handleKeyDown } : { inputValue: string, handleKeyDown: (event: React.MouseEvent<HTMLDivElement>) => void }) => {
    const { data: suggestions } = useSuggestions();

    return (
        <div className='w-[100%] border-1 m-4 grid grid-cols-4'>
            {suggestions?.map((item, index) => (
                inputValue.length > 0 && item.name.includes(inputValue) &&
                <div key={index} onClick={(e) => handleKeyDown(e)} className='cursor-pointer'>{item.name}</div>
            ))}
        </div>
    )
}

export default AutoComplete