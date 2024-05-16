import { sp } from '@pnp/sp';

export interface IComment {
  comment: string;
  date: Date;
  User: string;
  newsNews: string;
}

// Function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

export default class CommentService {
  async getComments(newsNews: string): Promise<IComment[]> {
    try {
      const response = await sp.web.lists
        .getByTitle("commentV3")
        .items.filter(`newsNews eq '${newsNews}'`) 
        .select("comment", "date", "User", "newsNews") 
        .get();
  
      const formattedComments = response.map((comment) => ({
        ...comment,
        date: formatDate(comment.date),
      }));
      return formattedComments;
    } catch (error) {
      throw new Error('Error fetching comments');
    }
  }
  

  async postComment(comment: string, newsNews: string): Promise<void> {
    try {
      const currentUser = await sp.web.currentUser.get();
      await sp.web.lists.getByTitle("commentV3").items.add({
        comment: comment,
        date: new Date(),
        User: currentUser.Title,
        newsNews: newsNews, 
      });
    } catch (error) {
      throw new Error('Error submitting comment');
    }
  }
  
}
