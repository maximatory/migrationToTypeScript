// interfaces for Classes
export interface INewsAndSources {
    draw(data: NewsApiResponse[] | SourcesApiResponse[]): void
}

export interface IView {
    drawNews(data: GeneralApiResponse):void
    drawSources(data: GeneralApiResponse):void
}

export interface ILoader {
    getResp(
        { endpoint, options}: GetResp, 
        callback: ()=> void
    ):void

    errorHandler(res:Response):void

    makeUrl(
        options: LoaderOptions,
        endpoint: Endpoints
    ):void

    load(
        method: Methods,
        endpoint: Endpoints,
        callback: (data?:GeneralApiResponse)=> void, 
        options: object
    ):void
}

export interface IController extends ILoader {
    getSources(callback: (data?:GeneralApiResponse)=> void):void
    getNews(e: Event, callback: (data?:GeneralApiResponse)=> void):void
}

export interface IApp {
    start():void
}

// types for data
export type NewsApiResponse = {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
    articles: string;
}

export type SourcesApiResponse = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: LanguagesType;
    country: CountrysType;
}

export type GeneralApiResponse = {
    status: 'ok' | 'error';
    totalResults?: number;
    articles?: NewsApiResponse[];
    sources?:  SourcesApiResponse[]
}


// other types 
export type LoaderOptions = {
    [key: string]: string
}

export type Response = {
    ok: boolean;
    status: number;
    statusText: string;
};

export type GetResp = {
    endpoint: Endpoints, 
    options?: LoaderOptions 
}

export enum Methods {
    'get'= 'GET',
    'post'= 'POST'
}

export enum Endpoints {
    'sources' = 'sources',
    'everything' = 'everything'
}

type LanguagesType = 
'ar' |
'de' |
'en' |
'es' |
'fr' |
'he' |
'it' |
'nl' |
'no' |
'pt' |
'ru' |
'sv' |
'ud' |
'zh';

type CountrysType = 
'ae' |
'ar' |
'at' |
'au' |
'be' |
'bg' |
'br' |
'ca' |
'ch' |
'cn' |
'co' |
'cu' |
'cz' |
'de' |
'eg' |
'fr' |
'gb' |
'gr' |
'hk' |
'hu' |
'id' |
'ie' |
'il' |
'in' |
'it' |
'jp' |
'kr' |
'lt' |
'lv' |
'ma' |
'mx' |
'my' |
'ng' |
'nl' |
'no' |
'nz' |
'ph' |
'pl' |
'pt' |
'ro' |
'rs' |
'ru' |
'sa' |
'se' |
'sg' |
'si' |
'sk' |
'th' |
'tr' |
'tw' |
'ua' |
'us' |
've' |
'za';