import { Endpoints, GeneralApiResponse, IController, NewsApiResponse } from '../../types/index';
import AppLoader from './appLoader';

class AppController extends AppLoader implements IController {
    // получаем список для кнопок
    getSources(callback: (data?:GeneralApiResponse)=> void) {
        super.getResp(
            {
                endpoint: Endpoints.sources,
            },
            callback
        );
    }

    // получаем список для новостей
    getNews(e: Event, callback: (data?:GeneralApiResponse)=> void) {
        // элемент на который кликнули
        let target = <HTMLElement>e.target;
        // элемент на котором изначально повешен слушатель события
        const newsContainer = <HTMLElement>e.currentTarget;

        // если кликнули по span, а не по кнопке
        while (target !== newsContainer) {
            // проверит содержит ли элемент класс соурс_айтем
            if (target.classList.contains('source__item')) {
                // получим значение аттрибута кнопки
                const sourceId = target.getAttribute('data-source-id');
                if(sourceId === null){
                    throw new Error()
                }
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);

                    // получаем дата с выбранным параметором новостей
                    super.getResp(
                        {
                            endpoint: Endpoints.everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = <HTMLDivElement>target.parentNode;
        }
    }
}

export default AppController;
