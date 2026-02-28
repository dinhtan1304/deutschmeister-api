import { IsIn, IsString } from 'class-validator';

export const FREE_SPEAKING_TOPIC_TYPES = [
  'sich_vorstellen', 'alltag', 'wohnen', 'arbeit',
  'familie', 'reisen', 'einkaufen', 'gesundheit', 'meinung',
] as const;

export class CreateFreeSpeakingDto {
  @IsIn(['A1', 'A2', 'B1'])
  cefrLevel: string;

  @IsIn(FREE_SPEAKING_TOPIC_TYPES)
  topicType: string;
}
