import { createPathFolder } from "@/lib/file-system-helper";
import { readFile } from "@/lib/utils";

let hasInitailised = false;
export async function setup() {
  if (hasInitailised === true) return;
  hasInitailised = true;

  document.body.style.backgroundImage = `url(/assets/Users/Default/Pictures/wallpaper.png)`;
  const picturesFolder = createPathFolder("/Users/Default/Pictures");
  //
  //const wallpaper = FileSystemItem.create(FSFile, {
  //  name: "wallpaper.png",
  //  parent: picturesFolder.id,
  //});
  //const imgFile = await fetch("/assets" + wallpaper.getPath()).then((res) =>
  //  res.blob(),
  //);
  //const imageContent = await readFile(imgFile);
  //if (imageContent) {
  //  wallpaper.content = imageContent;
  //} else {
  //  // default to black color png
  //}
  //
  //document.body.style.backgroundImage = `url(${wallpaper.content})`;
  //
  //hasInitailised = true;
}
