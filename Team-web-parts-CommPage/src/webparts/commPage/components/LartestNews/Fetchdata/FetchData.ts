import { sp } from "@pnp/sp/presets/all";

// Define the interface for the data structure
export interface NewsItem {
  ID: number;
  News: string;
  Description: string;
  Date: string;
  Link: string;
}

// Function to format the date
const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return dateObj.toLocaleDateString('fr-FR', options);
};

// Function to fetch latest news data from SharePoint
export const fetchLatestNewsData = async (): Promise<NewsItem[]> => {
  try {
    const response = await sp.web.lists.getByTitle("LatestNewsV2").items.select("ID","News", "Description", "Date", "Link").get();
    console.log("Latest News data response:", response);
    if (response && response.length > 0) {
      // Format the date before returning the data
      const formattedData = response.map(item => ({
        ...item,
        Date: formatDate(item.Date)
      }));
      return formattedData;
    } else {
      console.error("Empty response received for Latest News data.");
      return []; 
    }
  } catch (error) {
    console.error("Error fetching Latest News data:", error);
    return [];
  }
};
