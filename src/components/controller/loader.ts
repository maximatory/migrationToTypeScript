import { Endpoints, GeneralApiResponse, GetResp, ILoader, LoaderOptions, Methods } from "../../types/index";

class Loader implements ILoader {
    constructor(public baseLink:string, private options: LoaderOptions) {
        // базовая ссылка на API
        this.baseLink = baseLink;
        // параметры APY KEY
        this.options = options;
    }

    // получаем ответ
    getResp (
        { endpoint, options = {} }: GetResp,
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load(Methods.get, endpoint, callback, options);
    }

    // обработчик ошибок
    errorHandler(res:Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    // создать ссылку
    makeUrl(options: LoaderOptions, endpoint: Endpoints) {
        const urlOptions:LoaderOptions = { ...this.options, ...options };
        let url:string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load (method: Methods, endpoint: Endpoints, callback: (data?:GeneralApiResponse)=> void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
