// src/app/opengraph-image.tsx

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} - ${siteConfig.jobTitle}`;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function loadPortrait(): Promise<string | null> {
  try {
    const imagePath = join(
      process.cwd(),
      "public",
      "images",
      "bewket-mengie.jpg",
    );

    const image = await readFile(imagePath);
    const compatibleImage = await sharp(image)
      .jpeg({ quality: 85, progressive: false })
      .toBuffer();

    return `data:image/jpeg;base64,${compatibleImage.toString("base64")}`;
  } catch (error) {
    console.error("Profile image loading error:", error);
    return null;
  }
}

export default async function OpenGraphImage() {
  const portrait = await loadPortrait();

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: "#07111f",
        padding: "55px 65px",
        color: "#ffffff",
      }}
    >
      {/* LEFT CONTENT */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "680px",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#34d399",
            fontSize: "21px",
            letterSpacing: "2px",
          }}
        >
          SOFTWARE ENGINEERING · ETHIOPIA
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "62px",
            fontWeight: 700,
            marginTop: "25px",
          }}
        >
          {siteConfig.name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "34px",
            color: "#cbd5e1",
            marginTop: "15px",
          }}
        >
          {siteConfig.jobTitle}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "20px",
            color: "#94a3b8",
            marginTop: "30px",
          }}
        >
          Next.js · React · TypeScript · NestJS · PostgreSQL
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "19px",
            color: "#34d399",
            marginTop: "35px",
          }}
        >
          bewketmengie.com
        </div>
      </div>

      {/* RIGHT PROFILE IMAGE */}
      {portrait ? (
        <img
          src={portrait}
          alt={siteConfig.imageAlt}
          width="330"
          height="490"
          style={{
            width: "330px",
            height: "490px",
            marginLeft: "45px",
            objectFit: "cover",
            border: "3px solid #34d399",
            borderRadius: "20px",
          }}
        />
      ) : (
        <div
          style={{
            display: "flex",
            width: "330px",
            height: "490px",
            marginLeft: "45px",
            justifyContent: "center",
            alignItems: "center",
            color: "#34d399",
            fontSize: "50px",
            fontWeight: 700,
            border: "3px solid #34d399",
            borderRadius: "20px",
            backgroundColor: "#0f1b2d",
          }}
        >
          BM
        </div>
      )}
    </div>,
    size,
  );
}
