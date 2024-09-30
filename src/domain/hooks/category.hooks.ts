import {useState, useEffect} from 'react';
import {useGetAllCategoriesQuery} from '../../data/dataSource/graphql/entities/category/Category.gql.hooks';
import {Category} from '../../data/dataSource/graphql/graphql-schema-types';
import {CategoryRepository} from '../../data/repository/category.repository';

export const useGetCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Offline
  useEffect(() => {
    const fetchStoredCategories = async () => {
      try {
        const storedCategories =
          await CategoryRepository.getInstance().getAllCategories();
        setCategories(storedCategories);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching categories from local storage', err);
        setError('Failed to fetch categories from local storage');
        setLoading(false); // Ensure loading state is reset in case of error
      }
    };
    fetchStoredCategories();
  }, []);

  // Network
  const [{data, fetching, error: networkError}, refetch] =
    useGetAllCategoriesQuery({
      requestPolicy: 'cache-and-network',
    });

  useEffect(() => {
    if (data?.getAllCategories) {
      const filteredCategories = data.getAllCategories.filter(
        (category): category is Category => category !== null,
      );

      const saveCategories = async () => {
        try {
          await CategoryRepository.getInstance().setAllCategories(
            filteredCategories,
          );
          setCategories(filteredCategories);
        } catch (err) {
          console.error('Error saving categories to local storage', err);
          setError('Failed to save categories to local storage');
        }
      };
      saveCategories();
    }
    if (networkError) {
      setError('Failed to fetch categories from network');
    }
    setLoading(false); // Ensure loading state is reset after fetching data
  }, [data, networkError]);

  // Function to filter and set subcategories based on selected parent category ID
  const fetchAndSetSubCategories = (parentCategoryId: string) => {
    const filteredSubCategories = categories.filter(
      category => category.parent_id === parentCategoryId,
    );
    setSubCategories(filteredSubCategories);
  };

  return {
    categories,
    fetching: fetching || loading,
    error,
    refetch,
    subCategories,
    fetchAndSetSubCategories,
  };
};
