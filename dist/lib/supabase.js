"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
exports.uploadFileToSupabase = uploadFileToSupabase;
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
async function uploadFileToSupabase(bucket, path, fileBuffer, contentType) {
    const { data, error } = await exports.supabase.storage
        .from(bucket)
        .upload(path, fileBuffer, {
        contentType,
        upsert: true,
    });
    if (error) {
        console.error('Supabase upload error:', error);
        return null;
    }
    const { data: publicUrlData } = exports.supabase.storage
        .from(bucket)
        .getPublicUrl(path);
    return publicUrlData.publicUrl;
}
