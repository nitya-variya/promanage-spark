import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function test() {
  const url = new URL(process.env.GOOGLE_APPS_SCRIPT_URL);
  url.searchParams.append("email", "nityav.webosmotic@gmail.com");
  url.searchParams.append("token", process.env.INTERNAL_API_TOKEN);
  
  console.log("Fetching:", url.toString());
  
  const res = await fetch(url.toString());
  const text = await res.text();
  console.log("Response:", text);
}

test();
