import {image} from './image';

class ImagemService {
baseUrl: string = 'http://localhost:3000/images';

  async buscar(): Promise<image[]> {
    const reponse = await fetch(this.baseUrl,);
    return await reponse.json();
     }
}
export const userImage = () => new ImagemService();