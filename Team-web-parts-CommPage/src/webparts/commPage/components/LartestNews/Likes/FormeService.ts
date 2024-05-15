import { sp } from '@pnp/sp';
import { IFormData } from './IFormProps';
//import { Item } from '@pnp/sp/items';

export const submitForm = async (formData: IFormData) => {
  try {
    const list = sp.web.lists.getByTitle('Like2');
    await list.items.add({
      user: formData.user,
      likes: formData.likes,
      newsId: formData.newsId,
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    throw new Error('An error occurred while submitting the form. Please try again.');
  }
};


export const getFormData = async (newsId: number): Promise<IFormData[]> => {
  try {
    const list = sp.web.lists.getByTitle('Like2');
    // Query items that match the given newsId
    const items = await list.items.filter(`newsId eq '${newsId}'`).get();
    
    // Convert retrieved items to IFormData array
    const formData: IFormData[] = items.map((item: any) => ({
      id: item.Id,
      user: item.user,
      likes: item.likes,
      newsId: item.newsId
    }));

    // Log the retrieved items for debugging purposes
    console.log('Retrieved form data:', formData);
    
    return formData;
  } catch (error) {
    console.error('Error fetching form data:', error);
    throw new Error('An error occurred while fetching form data. Please try again.');
  }
};

export const deleteFormData = async (id: number) => {
  try {
    const list = sp.web.lists.getByTitle('Like2');
    await list.items.getById(id).delete();
  } catch (error) {
    console.error('Error deleting form data:', error);
    throw new Error('An error occurred while deleting form data. Please try again.');
  }
};
