import { GeneralApiResponse, IApp } from '../../types/index';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App implements IApp {
    public controller: AppController
    public view: AppView
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources = document.querySelector('.sources') as HTMLElement
        if(sources === null){
            throw new Error()
        }
        sources.addEventListener('click', (e) => this.controller.getNews(e, (data) => {
            if(data === undefined){
                throw new Error()
            }
            this.view.drawNews(data)
        }));

        this.controller.getSources((data) => {
            if(data === undefined){
                throw new Error()
            }
            this.view.drawSources(data)
        });
    }
}

export default App;
