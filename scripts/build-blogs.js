const fs = require("fs");
const path = require("path");
const { marked } = require("marked");
const root = process.cwd();
const postsDir = path.join(root, "posts");
const blogsDir = path.join(root, "blogs");
const legacyPath = path.join(root, "legacy", "blog.html");
const template = fs.readFileSync(path.join(root, "templates", "blog-template.html"), "utf8");
const escapeHtml = value => String(value || "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const slugify = value => String(value).toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "untitled-post";
const formatDate = value => {
  const d = new Date(value + "T12:00:00");
  return Number.isNaN(d.getTime()) ? value : new Intl.DateTimeFormat("en-IN", {day:"numeric",month:"long",year:"numeric",timeZone:"Asia/Kolkata"}).format(d);
};
function parsePost(file) {
  const source = fs.readFileSync(path.join(postsDir, file), "utf8");
  const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);
  const meta = {};
  let body = source;
  if (match) {
    match[1].split(/\r?\n/).forEach(line => {
      const pair = line.match(/^([a-zA-Z][\w-]*):\s*(.*?)\s*$/);
      if (pair) meta[pair[1]] = pair[2].replace(/^["']|["']$/g, "");
    });
    body = source.slice(match[0].length);
  }
  const title = meta.title || path.basename(file, ".md").replace(/-/g, " ");
  const slug = slugify(meta.slug || path.basename(file, ".md"));
  return {title,slug,date:meta.date || new Date().toISOString().slice(0,10),category:meta.category || "Payment Technology",description:meta.description || body.replace(/[#>*_\[\]()]/g," ").replace(/\s+/g," ").trim().slice(0,180),body:marked.parse(body),url:"blogs/" + slug + ".html"};
}
function renderPage(post, body) {
  return template.replaceAll("{{TITLE}}",escapeHtml(post.title)).replaceAll("{{DESCRIPTION}}",escapeHtml(post.description)).replaceAll("{{DATE}}",escapeHtml(post.date)).replaceAll("{{FORMATTED_DATE}}",escapeHtml(formatDate(post.date))).replaceAll("{{CATEGORY}}",escapeHtml(post.category)).replaceAll("{{AUTHOR}}","Pratyush Saxena").replaceAll("{{BODY}}",body);
}
function card(post) {
  return '<article class="post"><p class="category">' + escapeHtml(post.category) + '</p><h2>' + escapeHtml(post.title) + '</h2><time datetime="' + escapeHtml(post.date) + '">' + escapeHtml(formatDate(post.date)) + '</time><p class="summary">' + escapeHtml(post.description) + '</p><a class="read-more" href="' + escapeHtml(post.url) + '">Read More <span aria-hidden="true">→</span></a></article>';
}
function readLegacy() {
  if (!fs.existsSync(legacyPath)) return [];
  const html = fs.readFileSync(legacyPath,"utf8");
  const regex = /<article\b[^>]*class=["'][^"']*\bpost\b[^"']*["'][^>]*>[\s\S]*?<\/article>/gi;
  const result = [];
  let match, i = 0;
  while ((match = regex.exec(html))) {
    const article = match[0];
    const titleMatch = article.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i);
    const timeMatch = article.match(/<time[^>]*>([\s\S]*?)<\/time>/i);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g,"").trim() : "Previous article " + (i+1);
    const rawDate = timeMatch ? timeMatch[1].replace(/<[^>]+>/g,"").trim() : "2025-01-01";
    let date = "2025-01-01";
    const dm = rawDate.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
    if (dm) { const month = new Date(dm[2] + " 1, 2000").getMonth(); if (!Number.isNaN(month)) date = dm[3] + "-" + String(month+1).padStart(2,"0") + "-" + dm[1].padStart(2,"0"); }
    const slug = slugify(title);
    result.push({title,slug,date,category:"Payment Technology",description:article.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().slice(0,180),url:"blogs/"+slug+".html",body:article.replace(/^<article\b[^>]*>|<\/article>$/gi,"")});
    i++;
  }
  return result;
}
fs.mkdirSync(postsDir,{recursive:true});
fs.mkdirSync(blogsDir,{recursive:true});
const markdown = fs.readdirSync(postsDir).filter(f=>f.endsWith(".md") && !/^readme/i.test(f)).map(parsePost);
const legacy = [];
const seen = new Set();
const posts = markdown.concat(legacy).filter(post=>{
  if(seen.has(post.slug)){console.error("Duplicate blog slug: "+post.slug);process.exitCode=1;return false;}
  seen.add(post.slug);return true;
}).sort((a,b)=>b.date.localeCompare(a.date));
for (const file of fs.readdirSync(blogsDir)) { if (file.endsWith(".html")) fs.unlinkSync(path.join(blogsDir,file)); }
posts.forEach(post=>fs.writeFileSync(path.join(blogsDir,post.slug+".html"),renderPage(post,post.body),"utf8"));
const categories = Array.from(new Set(posts.map(p=>p.category))).sort();
const cards = posts.map(card).join("\n");
const listing = [
'<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">',
'<meta name="description" content="Practical articles on payment technology, ISO 8583, ISO 20022, HSM, cryptography, card processing, and fintech architecture.">',
'<title>Payment Technology Blogs | PlayWithPayments</title><link rel="stylesheet" href="templatemo-glossy-touch.css">',
'<style>.blog-wrap{max-width:1100px;margin:auto;padding:24px}.blog-header{display:flex;justify-content:space-between;align-items:center;gap:18px;flex-wrap:wrap}.blog-header h1,.blog-header p{color:#fff}.intro{color:#e5e7eb;line-height:1.7;max-width:760px}.tools{display:flex;gap:10px;flex-wrap:wrap;margin:24px 0}.tools input,.tools select{padding:12px 14px;border:1px solid #ffffff55;border-radius:10px;background:#16213e;color:#fff;min-width:180px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:20px}.post{padding:24px;border-radius:16px;background:rgba(255,255,255,.14);border:1px solid #ffffff33;backdrop-filter:blur(16px);color:#fff;display:flex;flex-direction:column;min-height:240px}.post h2{font-size:21px;line-height:1.35;color:#fff;margin:8px 0}.post time{font-size:13px;color:#dbeafe}.post .category{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#bfdbfe;margin:0}.post .summary{color:#f1f5f9;line-height:1.6;flex:1}.read-more{align-self:flex-start;color:#fff;font-weight:700;text-decoration:none;border:1px solid #ffffff80;border-radius:8px;padding:10px 14px}.read-more:hover{background:#ffffff22}.empty{color:#fff;padding:20px}@media(max-width:600px){.blog-wrap{padding:16px}}</style></head><body>',
'<div class="bg-shapes"><div class="shape"></div><div class="shape"></div><div class="shape"></div><div class="shape"></div><div class="shape"></div><div class="shape"></div></div>',
'<header class="glass"><div class="blog-wrap blog-header"><div><h1>💳 PlayWithPayments Blogs</h1><p>By Pratyush Saxena</p></div><nav><a href="index.html" style="color:#bfdbfe;text-decoration:none">← Back to Home</a></nav></div></header>',
'<main class="blog-wrap"><p class="intro">Practical explanations of payment systems, ISO messaging, HSM and cryptography, card processing, security, and fintech architecture.</p>',
'<div class="tools"><input id="blogSearch" type="search" placeholder="Search payment topics" aria-label="Search blogs"><select id="categoryFilter" aria-label="Filter by category"><option value="">All categories</option>'+categories.map(c=>'<option value="'+escapeHtml(c)+'">'+escapeHtml(c)+'</option>').join("")+'</select></div>',
'<div class="grid" id="blogGrid">'+(cards||'<p class="empty">New articles will appear here.</p>')+'</div><p class="empty" id="noResults" hidden>No articles match your search.</p></main>',
'<script>const search=document.getElementById("blogSearch"),filter=document.getElementById("categoryFilter"),cards=[...document.querySelectorAll(".post")];function applyFilters(){const q=search.value.toLowerCase().trim(),c=filter.value;let shown=0;cards.forEach(card=>{const ok=card.textContent.toLowerCase().includes(q)&&(!c||card.querySelector(".category")?.textContent===c);card.hidden=!ok;if(ok)shown++;});document.getElementById("noResults").hidden=shown!==0;}search.addEventListener("input",applyFilters);filter.addEventListener("change",applyFilters);</script></body></html>'
].join("\n");
fs.writeFileSync(path.join(root,"blog.html"),listing,"utf8");
console.log("Generated "+posts.length+" blog pages and blog.html");
