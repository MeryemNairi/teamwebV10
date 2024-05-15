import * as React from 'react';
import { IFormProps, IFormData } from './IFormProps';
import { submitForm, getFormData, deleteFormData } from './FormeService';
import styles from './Forme.module.scss';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const Forme: React.FC<IFormProps> = ({ context, newsId }) => {
  const [formData] = React.useState<IFormData>({
    id: 0,
    user: context.pageContext.user.displayName,
    likes: 1,
    newsId: newsId
  });

  const [formEntries, setFormEntries] = React.useState<IFormData[]>([]);

  React.useEffect(() => {
    fetchFormData();
    const interval = setInterval(fetchFormData, 2000); // MAJ les données

    return () => clearInterval(interval); // Nettoiage
  }, []);

  const fetchFormData = async () => {
    try {
      const formData = await getFormData(newsId);
      setFormEntries(formData); // MAJ
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const existingEntryIndex = formEntries.findIndex(
        entry => entry.user === formData.user
      );

      if (existingEntryIndex !== -1) {
        const existingEntry = formEntries[existingEntryIndex];
        await deleteFormData(existingEntry.id);
        const updatedEntries = [...formEntries];
        updatedEntries.splice(existingEntryIndex, 1);
        setFormEntries(updatedEntries);
      } else {
        await submitForm(formData);
      }

      // setFormData({
      //   id: 0,
      //   user: context.pageContext.user.displayName,
      //   likes: 1,

      // });

      fetchFormData(); // Rafraîchit les données 
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  const isUserLiked = formEntries.some(entry => entry.user === formData.user);

  const totalLikesByNewsId = (id: number) => {
    return formEntries.reduce((total, entry) => {
      if (entry.newsId === id) {
        return total + entry.likes;
      }
      return total;
    }, 0);
  };

  return (
    <div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <input type="hidden" id="user" name="user" value={formData.user} />
        <input type="hidden" id="likes" name="likes" value={formData.likes} />
        <div className={styles.button_holder}>
          <button type="submit" className={styles.button} >
            {isUserLiked ? <FavoriteIcon style={{ color: 'red', fontSize: '25px' }} /> : <FavoriteBorderIcon style={{ color: 'white', fontSize: '25px' }} />}
            <span style={{ color: 'white', fontSize: '12px', display: 'flex', height: '25px', alignItems: 'self-end' }}>{totalLikesByNewsId(newsId)}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Forme;
