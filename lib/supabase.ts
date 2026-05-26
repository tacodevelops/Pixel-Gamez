import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadFileToSupabase(
  bucket: string,
  path: string,
  fileBuffer: Buffer,
  contentType: string
): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, fileBuffer, {
      contentType,
      upsert: true,
    });

  if (error) {
    console.error('Supabase upload error:', error);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return publicUrlData.publicUrl;
}
