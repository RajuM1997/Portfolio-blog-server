-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "project_name" TEXT NOT NULL,
    "thumbnail" TEXT,
    "project_links" JSONB NOT NULL,
    "live_link" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT[],
    "technology" TEXT[],

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
