import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================
// Dashboard Stats Response
// ============================================
export class DashboardStatsDto {
  @ApiProperty({ example: 7, description: 'Số ngày học liên tiếp' })
  streak: number;

  @ApiProperty({ example: 85, description: 'Tổng số từ đã học' })
  totalWordsLearned: number;

  @ApiProperty({ example: 140, description: 'Tổng số từ trong hệ thống' })
  totalWords: number;

  @ApiProperty({ example: 78.5, description: 'Tỷ lệ trả lời đúng (%)' })
  accuracy: number;

  @ApiProperty({ example: 270, description: 'Tổng thời gian học (phút)' })
  totalMinutes: number;

  @ApiProperty({ example: 12, description: 'Số topic đã hoàn thành' })
  topicsCompleted: number;

  @ApiProperty({ example: 12, description: 'Tổng số topic' })
  totalTopics: number;

  @ApiProperty({ example: 45, description: 'Số từ cần ôn tập hôm nay' })
  wordsToReview: number;

  @ApiProperty({ example: 156, description: 'Số game đã chơi' })
  gamesPlayed: number;

  @ApiProperty({ example: '2024-01-15', description: 'Ngày bắt đầu học' })
  startedAt: string;
}

// ============================================
// Activity Heatmap (like GitHub)
// ============================================
export class ActivityDayDto {
  @ApiProperty({ example: '2024-01-15' })
  date: string;

  @ApiProperty({ example: 5, description: 'Số hoạt động trong ngày' })
  count: number;

  @ApiProperty({ example: 0, description: 'Level 0-4 cho màu sắc' })
  level: number;
}

export class ActivityHeatmapDto {
  @ApiProperty({ type: [ActivityDayDto] })
  data: ActivityDayDto[];

  @ApiProperty({ example: 120, description: 'Tổng số ngày hoạt động' })
  totalActiveDays: number;

  @ApiProperty({ example: 7, description: 'Streak hiện tại' })
  currentStreak: number;

  @ApiProperty({ example: 14, description: 'Streak dài nhất' })
  longestStreak: number;
}

// ============================================
// Weekly Progress Chart
// ============================================
export class WeeklyProgressDto {
  @ApiProperty({ example: 'Mon' })
  day: string;

  @ApiProperty({ example: '2024-01-15' })
  date: string;

  @ApiProperty({ example: 12, description: 'Số từ học được' })
  wordsLearned: number;

  @ApiProperty({ example: 5, description: 'Số game chơi' })
  gamesPlayed: number;

  @ApiProperty({ example: 30, description: 'Thời gian học (phút)' })
  minutes: number;
}

// ============================================
// Topic Progress Overview
// ============================================
export class TopicProgressDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  nameDe: string;

  @ApiProperty()
  nameVi: string;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  color: string;

  @ApiProperty({ example: 10 })
  wordsLearned: number;

  @ApiProperty({ example: 14 })
  totalWords: number;

  @ApiProperty({ example: 71.4 })
  percent: number;
}

// ============================================
// Recent Activity
// ============================================
export class RecentActivityDto {
  @ApiProperty({ example: 'game', enum: ['game', 'word', 'topic', 'review'] })
  type: string;

  @ApiProperty({ example: 'Chơi Quick Quiz - 8/10 đúng' })
  description: string;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  timestamp: string;

  @ApiProperty({ example: 'quick-quiz' })
  metadata?: string;
}

// ============================================
// Full Dashboard Response
// ============================================
export class FullDashboardDto {
  @ApiProperty({ type: DashboardStatsDto })
  stats: DashboardStatsDto;

  @ApiProperty({ type: ActivityHeatmapDto })
  heatmap: ActivityHeatmapDto;

  @ApiProperty({ type: [WeeklyProgressDto] })
  weeklyProgress: WeeklyProgressDto[];

  @ApiProperty({ type: [TopicProgressDto] })
  topicProgress: TopicProgressDto[];

  @ApiProperty({ type: [RecentActivityDto] })
  recentActivity: RecentActivityDto[];
}