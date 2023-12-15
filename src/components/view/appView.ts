import { GeneralApiResponse, IView } from '../../types/index';
import News from './news/news';
import Sources from './sources/sources';

// класс создания списка кнопок и новостей
export class AppView implements IView {
    constructor(public news: News = new News(), public sources: Sources = new Sources()) {
        this.news = new News();
        this.sources = new Sources();
    }

    // нарисовать новости
    drawNews(data: GeneralApiResponse) {
        if(data === undefined){
            throw new Error()
        }
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    // нарисовать кнопки
    drawSources(data: GeneralApiResponse) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
