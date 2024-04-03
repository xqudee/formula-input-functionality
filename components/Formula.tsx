'use client'

import { useSuggestions } from '@/hooks/useSuggestions';
import { useFormulaStore } from '@/store/store';
import { Suggestion } from '@/types/types';
// import Autocomplete from 'react-autocomplete'
import React, { useEffect, useState } from 'react'
import ReactSelect, { SingleValue } from 'react-select';
import AutoComplete from './AutoComplete';

interface OptionType {
    value: string;
    label: string;
  }

const Formula = () => {
    const { tags, setTags, inputValue, setInputValue, calculateResult, result } = useFormulaStore();
    const { data: suggestions } = useSuggestions();

    const addTag = (inputValue: string) => {
        if (inputValue.length == 0) return;

        const tagItem = suggestions?.find(s => s.name.includes(inputValue))
        if (!tagItem) {
            const supportedOperands = ['+', '-', '*', '/', '(', ')', '^'];
            if (supportedOperands.includes(inputValue)) {
                const newOperand = {
                    name: inputValue,
                    type: 'operand'
                };
                const newTags = [...tags, newOperand] as Suggestion[];
                setTags(newTags);
            } else {
                console.error('Unsupported operand:', inputValue);
            }
        } else {
            const newI = {
                ...tagItem,
                type: 'tag'
            }
            
            const newTags = [...tags, newI] as Suggestion[];
            setTags(newTags);
        }
        setInputValue('')
    }

    const handleEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event?.key === 'Enter') {
            addTag(inputValue);
        }

        if (event.key === 'Backspace') {
            if (inputValue.length == 0) {
                const del = tags.slice(0, tags.length - 1)
                setTags(del);
            }
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.currentTarget.textContent) addTag(event.currentTarget.textContent);
    };

    useEffect(() => {
        calculateResult();
    }, [tags])

    // const [value, setValue] = useState('')
    return (
        <div className='m-5'>
            <div>
                Result: {result}
            </div>

            <div className='flex border rounded-[5px] py-[5px] px-[10px] my-5'>
                {tags?.map((tag, index) => (
                    <span key={index} className={`text-nowrap mr-2 px-2 py-[2px] rounded-md ${tag.type == 'tag' && 'bg-slate-200 '}`}>
                        {tag?.name}
                    </span>
                ))}
                <input name='tag' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleEnter} />
                {/* <Autocomplete
                    wrapperProps={{ className: 'w-[100%] outline-none' }}
                    getItemValue={(item) => item.name}
                    items={suggestions as any[] || []}
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item.name.includes(inputValue) && item.name }
                        </div>
                    }
                    value={inputValue || ''}
                    onChange={(e) => setInputValue(e.target.value)}
                    onSelect={(_, item) => handleInputChange(item)}
                    
                /> */}
            </div>

            <AutoComplete inputValue={inputValue} handleKeyDown={handleClick} />
        </div>
    )
}

export default Formula
