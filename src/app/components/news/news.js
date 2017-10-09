import news from './news.vue';
import newsDetail from './news-detail/news-detail';
import newsList from './news-list/news-list';

let newsModule = [
    { path: '/news', component: news, meta:{title:'news'} },
]
newsModule=newsModule.concat(
    newsDetail,
    newsList
);

export default newsModule;