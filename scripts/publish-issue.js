const fs = require("fs");
const path = require("path");
const body = JSON.parse(process.env.ISSUE_BODY || '" "');
const issueTitle = JSON.parse(process.env.ISSUE_TITLE || '" "');
function field(label) {
  const regex = new RegExp("### " + label + "\\s*\\r?\\n([\\s\\S]*?)(?=\\r?\\n### |$)", "i");
  const match = body.match(regex);
  const value = match ? match[1].trim() : "";
  return /^_No response_$/i.test(value) ? "" : value;
}
const data = {title:field("Blog title"),date:field("Publication date, YYYY-MM-DD"),category:field("Category"),description:field("Short description"),content:field("Full article in Markdown")};
if (!data.title) data.title = issueTitle.replace(/^\\[Blog\\]\\s*/i,"").trim();
if (!data.title || !data.category || !data.description || !data.content) throw new Error("Required blog fields are missing.");
if (!data.date) data.date = new Date().toISOString().slice(0,10);
if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(data.date) || Number.isNaN(Date.parse(data.date))) throw new Error("Date must use YYYY-MM-DD.");
const slug = data.title.toLowerCase().normalize("NFKD").replace(/[\\u0300-\\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"") || "untitled-post";
const quote = value => JSON.stringify(value.replace(/\\r/g,"").trim());
const markdown = ["---","title: "+quote(data.title),"date: "+quote(data.date),"description: "+quote(data.description),"category: "+quote(data.category),"slug: "+quote(slug),"---","",data.content,""].join("\\n");
const file = path.join(process.cwd(),"posts",slug+".md");
fs.mkdirSync(path.dirname(file),{recursive:true});
if (fs.existsSync(file)) throw new Error("A blog with this title already exists. Change the title or edit its Markdown file.");
fs.writeFileSync(file,markdown,"utf8");
console.log("Created "+file);
