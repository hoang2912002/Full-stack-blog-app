import { createClient } from '@supabase/supabase-js'

export async function uploadThumbnail(image:File) {
    const supabaseUrl = process.env.SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_API_KEY!

    const supabase = createClient(supabaseUrl,supabaseKey)


    //from("thumbnails"): chọn bucket tên là thumbnails trong Supabase Storage
    //upload(...): upload file ảnh lên với tên ${image.name}_${Date.now()}
    //
    const data = await supabase
        .storage
        .from("thumbnails")
        .upload(`${image.name}_${Date.now()}`,image); 
    if(!data.data?.path) throw new Error("Fail to upload the file")
    //Lấy lại url public của ảnh đã upload do config khi tạo buckets
    const urlData = await supabase.storage.from("thumbnails").getPublicUrl(data.data?.path)

    return urlData.data.publicUrl
}


export async function fileToBase64(file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}