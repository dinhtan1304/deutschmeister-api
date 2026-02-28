import { SetMetadata } from '@nestjs/common';

export const Feature = (feature: string) => SetMetadata('practice_feature', feature);
