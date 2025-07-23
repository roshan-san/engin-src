import { createFileRoute } from '@tanstack/react-router';
import TrendingTopics from '@/features/platform/landing/TrendingTopics';

export const Route = createFileRoute('/_protected/trending')({
  component: TrendingTopics,
}); 