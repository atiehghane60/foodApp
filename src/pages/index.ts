import Recipe from './Recipe/Recipe';
import Search from './Search/Search';
import NotFound from './errors/notFound/404';

const Pages = [
  {
    id: 0,
    title: 'Page Not Found',
    component: NotFound,
    path: '*',
    exact: true,
  },
  {
    id: 1,
    title: 'Search',
    component: Search,
    path: '/',
    exact: true,
  },
  {
    id: 2,
    title: 'Recipe',
    component: Recipe,
    path: '/recipes/:id',
    exact: true,
  },
  {
    id: 3,
    title: 'Wishes',
    component: Search,
    path: '/wishes',
    exact: true,
  },
];

export default Pages;
