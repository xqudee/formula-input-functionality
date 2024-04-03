import { create } from 'zustand';
import { Suggestion } from '@/types/types';
import * as math from 'mathjs';

interface FormulaState {
    tags: Suggestion[];
    setTags: (tags: Suggestion[]) => void;
    inputValue: string;
    setInputValue: (value: string) => void;
    result: string,
    calculateResult: () => void;
}

export const useFormulaStore = create<FormulaState>((set, get) => ({
    tags: [],
    setTags: (tags) => set({ tags }),
    inputValue: '',
    setInputValue: (value) => {
        console.log(value);
        
        set({ inputValue: value })
    },
    result: '0',
    calculateResult: () => {
        const tags = get().tags;
        if (tags.length % 2 == 0) return;

        let string = '';

        tags?.forEach((tag) => {
            if (tag.type == 'operand') string += tag.name;
            else string += tag.value;
        })

        try {
            const result = math.evaluate(string);
            set({result : result})
        } catch (error) {
            set({result : 'Error'})
        }

    },
}));