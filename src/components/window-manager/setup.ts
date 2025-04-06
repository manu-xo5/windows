import { readFile } from "@/lib/utils";

const hasInitailised = false;
export async function setup() {
  document.body.style.backgroundImage = `url(/assets/Users/Default/Pictures/wallpaper.png)`;

  //if (hasInitailised === true) return;
  //const picturesFolderId = createNestedFolders("/Users/Default/Pictures");
  //const picturesFolder = DISK[picturesFolderId];
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
