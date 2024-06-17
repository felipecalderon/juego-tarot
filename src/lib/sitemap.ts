import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://lecturatarot.vercel.app/",
            lastModified: "2024-06-17T19:30:00.000Z",
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: "https://lecturatarot.vercel.app/play/",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
    ]
}
