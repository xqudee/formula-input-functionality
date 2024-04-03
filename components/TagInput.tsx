// TagInput.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { useFormulaStore } from '@/store/store'; // Импортируйте ваш Zustand store
import { useSuggestions } from '@/hooks/useSuggestions'; // Импортируйте ваш React Query hook
import Select, { SingleValue } from 'react-select';
import { Suggestion } from '@/types/types';

const TagInput: React.FC = () => {
  const { tags, setTags, inputValue, setInputValue } = useFormulaStore();
  const { data: suggestions } = useSuggestions();

  useEffect(() => {
    if (inputValue.trim() && suggestions) {
      const matchingSuggestion = suggestions.find(
        (suggestion) => suggestion.name.toLowerCase() === inputValue.trim().toLowerCase()
      );
      if (matchingSuggestion) {
        setTags([...tags, matchingSuggestion.name]);
        setInputValue('');
      }
    }
  }, [inputValue, suggestions, setTags, tags, setInputValue]);

  const handleSelectChange = (selectedOption: SingleValue<{ value: string }>) => {
    if (selectedOption) {
      setTags([...tags, selectedOption.value]);
      setInputValue('');
    }
  };

  const handleTagDelete = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="tags-input-container">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
            <button className="delete-btn" onClick={() => handleTagDelete(index)}>
              x
            </button>
          </span>
        ))}
        <Select
          options={suggestions?.map((suggestion) => ({
            value: suggestion.name,
            label: suggestion.name,
          }))}
          onInputChange={(value) => setInputValue(value)}
          onChange={handleSelectChange}
          inputValue={inputValue}
          menuIsOpen={inputValue.length > 0}
        />
      </div>
    </div>
  );
};

export default TagInput;
