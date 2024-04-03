
export interface Suggestion {
    name: string;
    category: string;
    value: number | string;
    id: string;
    type: 'tag' | 'operand';
}