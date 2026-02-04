-- CreateTable
CREATE TABLE "topics" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name_de" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_vi" TEXT NOT NULL,
    "description_de" TEXT,
    "description_en" TEXT,
    "description_vi" TEXT,
    "icon" TEXT,
    "color" TEXT,
    "image_url" TEXT,
    "level" TEXT NOT NULL DEFAULT 'A1',
    "order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "word_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topic_words" (
    "id" TEXT NOT NULL,
    "topic_id" TEXT NOT NULL,
    "word_id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "is_core" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "topic_words_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topic_progress" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "topic_id" TEXT NOT NULL,
    "words_learned" INTEGER NOT NULL DEFAULT 0,
    "words_total" INTEGER NOT NULL DEFAULT 0,
    "mastery_percent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "last_studied_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "topic_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "topics_slug_key" ON "topics"("slug");

-- CreateIndex
CREATE INDEX "topics_level_idx" ON "topics"("level");

-- CreateIndex
CREATE INDEX "topics_order_idx" ON "topics"("order");

-- CreateIndex
CREATE INDEX "topic_words_topic_id_idx" ON "topic_words"("topic_id");

-- CreateIndex
CREATE INDEX "topic_words_word_id_idx" ON "topic_words"("word_id");

-- CreateIndex
CREATE UNIQUE INDEX "topic_words_topic_id_word_id_key" ON "topic_words"("topic_id", "word_id");

-- CreateIndex
CREATE INDEX "topic_progress_user_id_idx" ON "topic_progress"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "topic_progress_user_id_topic_id_key" ON "topic_progress"("user_id", "topic_id");

-- AddForeignKey
ALTER TABLE "topic_words" ADD CONSTRAINT "topic_words_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_words" ADD CONSTRAINT "topic_words_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_progress" ADD CONSTRAINT "topic_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_progress" ADD CONSTRAINT "topic_progress_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
