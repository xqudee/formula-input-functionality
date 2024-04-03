
import { Suggestion } from '@/types/types';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchSuggestions = async (): Promise<Suggestion[]> => {
    const { data } = await axios.get(`https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete`);
    return data;
};

const fetchSuggestionByName = async (tagName: string): Promise<Suggestion[]> => {
    try {
      const { data } = await axios.get(`https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete?name=${tagName}`);
      console.log(data);
      
      return data;
    } catch (error) {
      throw new Error('Failed to fetch tag by name');
    }
};
  
export const useSuggestions = () => {
  return useQuery<Suggestion[], Error>('suggestions', fetchSuggestions);
};

export const useSuggestionByName = (tagName: string) => {
  return useQuery<Suggestion[], Error>(['tag', tagName], () => fetchSuggestionByName(tagName));
};