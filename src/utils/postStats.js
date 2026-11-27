const STATS_URL = "/api/stats";

export async function fetchStatsForSlugs(slugs) {
  const clean = [...new Set((slugs || []).filter(Boolean))];
  if (clean.length === 0) return {};

  const res = await fetch(
    `${STATS_URL}?slugs=${encodeURIComponent(clean.join(","))}`,
  );
  if (!res.ok) return {};
  const data = await res.json();
  return data.stats || {};
}

export async function trackArticleView(slug) {
  if (!slug) return null;

  const res = await fetch(STATS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug, action: "view" }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.views ?? data.stats?.[slug]?.views ?? null;
}

export async function setArticleLike(slug, shouldLike) {
  if (!slug) return null;

  const res = await fetch(STATS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slug,
      action: shouldLike ? "like" : "unlike",
    }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.likes ?? data.stats?.[slug]?.likes ?? null;
}
