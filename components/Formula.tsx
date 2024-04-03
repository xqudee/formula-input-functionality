import { useSuggestions } from '@/hooks/useSuggestions';
import { useFormulaStore } from '@/store/store';
import { Suggestion } from '@/types/types';
import React, { useEffect, useState } from 'react'
import AutoComplete from './AutoComplete';

const Formula = () => {
    const { tags, setTags, inputValue, setInputValue, calculateResult } = useFormulaStore();
    const { data: suggestions } = useSuggestions();

    const addTag = (inputValue: string) => {
        if (inputValue.length == 0) return;

        const tagItem = suggestions?.find(s => s.name.includes(inputValue))
        if (tagItem) {
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
                calculateResult();
            }
        }
    }

    const changeInput = (input: string) => {
        const supportedOperands = ['+', '-', '*', '/', '(', ')', '^'];
        if (supportedOperands.includes(input)) {
            const operand = {
                name: input,
                type: 'operand'
            }
            const newTags = [...tags, operand] as Suggestion[];
            setTags(newTags);
        }
        else setInputValue(input)
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.currentTarget.textContent) addTag(event.currentTarget.textContent);
    };

    useEffect(() => {
        calculateResult();
    }, [tags])

    return (
        <>

            <div className='flex border rounded-[5px] py-[5px] px-[10px] my-5'>
                {tags?.map((tag, index) => (
                    <span key={index} className={`text-nowrap mr-2 px-2 py-[2px] rounded-md ${tag.type == 'tag' && 'bg-slate-200 '}`}>
                        {tag?.name}
                    </span>
                ))}
                <input name='tag' value={inputValue} onChange={(e) => changeInput(e.target.value)} onKeyDown={handleEnter} autoComplete='off' />
            </div>

            <AutoComplete inputValue={inputValue} handleKeyDown={handleClick} />
        </>
    )
}

export default Formula
