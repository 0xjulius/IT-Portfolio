import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const SLUG_RE = /^[a-z0-9-]+$/i;

function isValidSlug(slug) {
  return typeof slug === "string" && SLUG_RE.test(slug) && slug.length <= 120;
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const raw = String(req.query?.slugs || "");
      const slugs = raw
        .split(",")
        .map((s) => s.trim())
        .filter(isValidSlug)
        .slice(0, 50);

      if (slugs.length === 0) {
        return res
          .status(400)
          .json({ error: "Virheellinen tai puuttuva slug" });
      }

      const keys = slugs.flatMap((slug) => [
        `portfolio:views:${slug}`,
        `portfolio:likes:${slug}`,
      ]);
      const values = await redis.mget(...keys);

      const stats = {};
      slugs.forEach((slug, idx) => {
        stats[slug] = {
          views: Number(values[idx * 2]) || 0,
          likes: Number(values[idx * 2 + 1]) || 0,
        };
      });

      return res.status(200).json({ stats });
    } catch (err) {
      console.error("GET /api/stats error:", err);
      return res.status(500).json({ error: "Tilastojen haku epäonnistui" });
    }
  }

  if (req.method === "POST") {
    try {
      const body =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
      const { slug, action } = body;

      if (!isValidSlug(slug)) {
        return res.status(400).json({ error: "Virheellinen slug" });
      }

      if (action === "view") {
        const views = await redis.incr(`portfolio:views:${slug}`);
        return res.status(200).json({ views });
      }

      if (action === "like") {
        const likes = await redis.incr(`portfolio:likes:${slug}`);
        return res.status(200).json({ likes });
      }

      if (action === "unlike") {
        const current = Number(await redis.get(`portfolio:likes:${slug}`)) || 0;
        const likes =
          current > 0 ? await redis.decr(`portfolio:likes:${slug}`) : 0;
        return res.status(200).json({ likes: Math.max(0, Number(likes) || 0) });
      }

      return res.status(400).json({ error: "Tuntematon toiminto" });
    } catch (err) {
      console.error("POST /api/stats error:", err);
      return res.status(500).json({ error: "Päivitys epäonnistui" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
