import Search from './Search/Search';
import NotFound from './errors/notFound/404';

const Pages = [
  {
    id: 0,
    title:"Page Not Found",
    component: NotFound,
    path: '*',
    exact: true,
  },
  {
    id: 1,
    title:"Search",
    component: Search,
    path: '/',
    exact: true,
  },
];

export default Pages;
