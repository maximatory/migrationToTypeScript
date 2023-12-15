import { INewsAndSources, SourcesApiResponse } from '../../../types/index';
import './sources.css';

// класс создания кнопкок
// вставит список кнопок в HTML в элемент sources
class Sources implements INewsAndSources {
    draw(data: SourcesApiResponse[]) {
        const fragment = document.createDocumentFragment(); // создается оболочка, не встраивается в DOM
        const sourceItemTemp:HTMLTemplateElement | null = document.querySelector('#sourceItemTemp'); // обращаемся с template в HTML
        if (sourceItemTemp === null) {
            throw new Error();
        }

        // перебор элементов и добавление клонов в шаблон
        data.forEach((item) => {
            const sourceClone = <DocumentFragment>sourceItemTemp.content.cloneNode(true);

            (<HTMLSpanElement>sourceClone.querySelector('.source__item-name')).textContent = item.name; // текст кнопки span
            (<HTMLDivElement>sourceClone.querySelector('.source__item')).setAttribute('data-source-id', item.id); // добавляет аттрибут

            fragment.append(sourceClone);
        });

        // добавляет шаблон в html
        (<HTMLDivElement>document.querySelector('.sources')).append(fragment);
    }
}

export default Sources;
