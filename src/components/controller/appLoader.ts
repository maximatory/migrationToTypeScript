import { ILoader } from '../../types/index';
import Loader from './loader';

class AppLoader extends Loader implements ILoader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'd7234933cba64e51912ea52281aba0c0', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
