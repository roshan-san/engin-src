import TrendingTopics from './trending';

export const trendingRoute = {
  path: '/trending',
  element: <TrendingTopics />,
  children: [
    {
      path: '/trending/:tag',
      element: <TrendingTopics />,
    },
  ],
}; 