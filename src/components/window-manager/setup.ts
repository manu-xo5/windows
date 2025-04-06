import { createFileAtom } from "@/lib/file-system-file";
import {
  addChildrenAtom,
  atomOfPath,
  rootFolderAtom,
} from "@/lib/file-system-folder";
import { createPathFolder } from "@/lib/file-system-helper";
import { loadResource } from "@/lib/utils";
import { getDefaultStore } from "jotai";
const store = getDefaultStore();

let hasInitailised = false;
export async function setup() {
  if (hasInitailised === true) return;
  hasInitailised = true;
  console.log("--------------------");

  document.body.style.backgroundImage = `url(/assets/Users/Default/Pictures/wallpaper.png)`;
  const picturesFolder = createPathFolder("/Users/Default/", "Pictures");
  const wallpaperFileAtom = store.set(
    createFileAtom,
    "wallpaper.png",
    new Blob([""]),
  );
  store.set(addChildrenAtom, picturesFolder, wallpaperFileAtom);
  const pathAtom = atomOfPath(picturesFolder);

  const imgBlob = await loadResource(
    store.get(pathAtom),
    store.get(wallpaperFileAtom).name,
  );
  store.set(wallpaperFileAtom, (prev) => ({
    ...prev,
    content: imgBlob,
  }));

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
