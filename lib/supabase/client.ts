import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL! ||
      "https://vsigksciqbuyjzowkoti.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! ||
      "sb_publishable_N5V9kHiit5kedf8feaoeDQ_qNe8jy7D"
  );
}
