import { sp } from '@pnp/sp';

export class DocumentLibraryService {
  public async getImages(libraryUrl: string): Promise<string[]> {
    try {
      const imagesResponse = await sp.web.getList(libraryUrl).items
        .filter("ContentType eq 'Image'")
        .select('FileRef')
        .get();
      const imageUrls = imagesResponse.map(item => item.FileRef);
      return imageUrls;
    } catch (error) {
      console.error('Error loading images', error);
      return [];
    }
  }

  public async getVideos(libraryUrl: string): Promise<string[]> {
    try {
      const videosResponse = await sp.web.getList(libraryUrl).items
        .filter("ContentType eq 'Video'")
        .select('FileRef')
        .get();
      const videoUrls = videosResponse.map(item => item.FileRef);
      return videoUrls;
    } catch (error) {
      console.error('Error loading videos', error);
      return [];
    }
  }
}
