import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("cabins could not be loaded");
    throw new Error("cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = typeof newCabin.image === "string";
  // console.log(newCabin, id);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //https://xvlilqzssfadaxymlilv.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  console.log(hasImagePath);
  console.log(imagePath);

  let query = supabase.from("cabins");
  // 1. Create a cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // 2. Edit a cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error("Cabin could not be created");
    throw new Error("Cabin could not be created");
  }

  if (!hasImagePath) {
    const { error: storageErr } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageErr) {
      await supabase.from("cabins").delete().eq("id", data[0].id);
      console.error(storageErr);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created"
      );
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("Cabin could not be deleted");
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
