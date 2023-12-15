import { INewsAndSources, NewsApiResponse } from '../../../types/index';
import './news.css';

// класс создания новостей
// вставит список новостей в HTML в элемент news
class News implements INewsAndSources {
    // принимаем дату
    draw(data: NewsApiResponse[]) {
        // получаем список новостей, с ограничением до 10 штук
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        // создаем фрагмент
        const fragment = document.createDocumentFragment();

        // получаем доступ к шаблону в html
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        if (newsItemTemp === null) {
            throw new Error();
        }

        // перебираем список новостей
        news.forEach((item, idx) => {
            // создаем клон шаблона
            const newsClone = <DocumentFragment>newsItemTemp.content.cloneNode(true);
            if (!(newsClone instanceof DocumentFragment)) {
                throw new Error();
            }

            // каждая вторая новость с дополнительным классом для стилистики отображения списка
            if (idx % 2) (<HTMLDivElement>newsClone.querySelector('.news__item')).classList.add('alt');

            // дочернему элементу с фото присваимваем ссылку на фото с data
            (<HTMLDivElement>newsClone.querySelector('.news__meta-photo')).style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;

            // дочернему элементу с автором присваимваем имя автора с data || имя ресурса
            (<HTMLLIElement>newsClone.querySelector('.news__meta-author')).textContent =
                item.author || item.source.name;

            // дочернему элементу присваиваем дату
            (<HTMLLIElement>newsClone.querySelector('.news__meta-date')).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            // остальным дочерним элементам добавляем информацию
            (<HTMLTitleElement>newsClone.querySelector('.news__description-title')).textContent = item.title;
            (<HTMLTitleElement>newsClone.querySelector('.news__description-source')).textContent = item.source.name;
            (<HTMLParagraphElement>newsClone.querySelector('.news__description-content')).textContent =
                item.description;
            (<HTMLParagraphElement>newsClone.querySelector('.news__read-more a')).setAttribute('href', item.url);

            // добавляем клон в фрагмент
            fragment.append(newsClone);
        });

        // обнуляем список новостей
        (<HTMLDivElement>document.querySelector('.news')).innerHTML = '';

        // добавляет шаблон новостей в html
        (<HTMLDivElement>document.querySelector('.news')).appendChild(fragment);
    }
}

export default News;
