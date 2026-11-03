import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} - ${siteConfig.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const imagePath = join(
    process.cwd(),
    "public",
    siteConfig.image.replace(/^\/+/, ""),
  );
  const portrait = await readFile(imagePath);
  const portraitData = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "64px 72px",
        backgroundColor: "#07111f",
        color: "#f8fafc",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: 700,
        }}
      >
        <div
          style={{
            color: "#34d399",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Software Engineering · Ethiopia
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 18,
            color: "#cbd5e1",
            fontSize: 34,
          }}
        >
          {siteConfig.jobTitle}
        </div>
        <div
          style={{
            marginTop: 34,
            color: "#94a3b8",
            fontSize: 21,
          }}
        >
          Next.js · React · TypeScript · NestJS · PostgreSQL
        </div>
        <div
          style={{
            marginTop: 38,
            color: "#34d399",
            fontSize: 19,
            fontWeight: 600,
          }}
        >
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
      <img
        src={portraitData}
        alt={siteConfig.name}
        width={330}
        height={490}
        style={{
          width: 330,
          height: 490,
          borderRadius: 20,
          objectFit: "cover",
          objectPosition: "center top",
          border: "2px solid #34d399",
        }}
      />
    </div>,
    size,
  );
}
