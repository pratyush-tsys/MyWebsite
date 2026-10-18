const OWNER = "pratyush-tsys";
const REPO = "MyWebsite";
const BRANCH = "main";
const MAX_BODY_LENGTH = 60000;

const json = (statusCode, payload) => new Response(JSON.stringify(payload), {
  status: statusCode,
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
});

const slugify = value => String(value).toLowerCase().normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "").slice(0, 90) || "untitled-post";

const yaml = value => '"' + String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r?\n/g, " ") + '"';

export default async (request) => {
  if (request.method !== "POST") return json(405, { error: "Method not allowed." });
  const expectedPassword = process.env.BLOG_PUBLISH_PASSWORD;
  const token = process.env.GITHUB_TOKEN;
  if (!expectedPassword || !token) return json(503, { error: "Publishing is not configured yet. The site owner must configure the Netlify function secrets." });
  const providedPassword = request.headers.get("x-publish-password") || "";
  if (providedPassword.length !== expectedPassword.length ||
      !crypto.timingSafeEqual(new TextEncoder().encode(providedPassword), new TextEncoder().encode(expectedPassword))) {
    return json(401, { error: "Incorrect publishing password." });
  }

  let input;
  try { input = await request.json(); } catch { return json(400, { error: "Please submit valid form data." }); }
  const title = String(input.title || "").trim();
  const body = String(input.body || "");
  const category = String(input.category || "Payment Technology").trim();
  const date = String(input.date || "");
  const description = String(input.description || body.replace(/\s+/g, " ").trim().slice(0, 180)).trim().slice(0, 200);
  if (!title || !body.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return json(400, { error: "Title, body and a valid publication date are required." });
  if (title.length > 140 || body.length > MAX_BODY_LENGTH) return json(413, { error: "The title or article is too long." });
  if (category.length > 80) return json(400, { error: "Category is too long." });

  const slug = slugify(title);
  const path = "posts/" + slug + ".md";
  const content = `---
title: ${yaml(title)}
slug: ${yaml(slug)}
date: ${date}
category: ${yaml(category)}
description: ${yaml(description)}
---

${body.replace(/\r\n/g, "\n").trim()}\n`;
  const apiUrl = "https://api.github.com/repos/" + OWNER + "/" + REPO + "/contents/" + path;
  try {
    const existing = await fetch(apiUrl + "?ref=" + BRANCH, {
      headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" }
    });
    if (existing.ok) return json(409, { error: "A post with this title already exists. Change the title to create a unique slug." });
    if (existing.status !== 404) return json(502, { error: "Could not check GitHub for an existing post." });

    const result = await fetch(apiUrl, {
      method: "PUT",
      headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json", "Content-Type": "application/json", "X-GitHub-Api-Version": "2022-11-28" },
      body: JSON.stringify({ message: "Add blog post: " + title.slice(0, 100), content: btoa(unescape(encodeURIComponent(content))), branch: BRANCH })
    });
    const data = await result.json();
    if (!result.ok) {
      if (result.status === 401 || result.status === 403) return json(502, { error: "GitHub rejected the publishing credentials or permissions. Check the token configuration." });
      return json(502, { error: data.message || "GitHub could not save the post." });
    }
    return json(201, { message: "File saved as " + path + ". Allow GitHub Actions and Netlify a moment to rebuild the site.", path, url: data.content?.html_url || null });
  } catch {
    return json(502, { error: "Unable to reach GitHub. Please try again later." });
  }
};
