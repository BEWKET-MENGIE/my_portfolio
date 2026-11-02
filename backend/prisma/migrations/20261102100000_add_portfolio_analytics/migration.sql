CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL,
    "visitorId" VARCHAR(36) NOT NULL,
    "firstSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "country" VARCHAR(100),
    "city" VARCHAR(100),
    "deviceType" VARCHAR(40),
    "browser" VARCHAR(100),
    "operatingSystem" VARCHAR(100),
    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "PageView" (
    "id" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "page" VARCHAR(300) NOT NULL,
    "referrer" VARCHAR(255),
    "source" VARCHAR(255) NOT NULL DEFAULT 'Direct',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PageView_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "VisitorEvent" (
    "id" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "eventName" VARCHAR(100) NOT NULL,
    "page" VARCHAR(300),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "VisitorEvent_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Visitor_visitorId_key" ON "Visitor"("visitorId");
CREATE INDEX "Visitor_firstSeen_idx" ON "Visitor"("firstSeen");
CREATE INDEX "Visitor_country_idx" ON "Visitor"("country");
CREATE INDEX "PageView_createdAt_idx" ON "PageView"("createdAt");
CREATE INDEX "PageView_page_createdAt_idx" ON "PageView"("page", "createdAt");
CREATE INDEX "PageView_visitorId_createdAt_idx" ON "PageView"("visitorId", "createdAt");
CREATE INDEX "PageView_source_createdAt_idx" ON "PageView"("source", "createdAt");
CREATE INDEX "VisitorEvent_eventName_createdAt_idx" ON "VisitorEvent"("eventName", "createdAt");
CREATE INDEX "VisitorEvent_createdAt_idx" ON "VisitorEvent"("createdAt");
ALTER TABLE "PageView"
ADD CONSTRAINT "PageView_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "Visitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "VisitorEvent"
ADD CONSTRAINT "VisitorEvent_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "Visitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;