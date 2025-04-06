import { ContextMenuItem } from "@/components/context-menu";
import { openMenuAtom } from "@/components/context-menu/atoms";
import { ImageViewerApp } from "@/components/image-viewer.tsx";
import { addWindowAtom } from "@/components/window-manager/atoms";
import { FileAtom } from "@/lib/file-system-types";
import { useAtomValue, useSetAtom } from "jotai";
import { FileButton } from "./file-button";

type Props = {
  fileAtom: FileAtom;
};

export function ImageFile({ fileAtom }: Props) {
  const file = useAtomValue(fileAtom);
  const openMenu = useSetAtom(openMenuAtom);
  const addWindow = useSetAtom(addWindowAtom);

  const handleOpenImageViewer = () => {
    console.log("double click");
    addWindow((id) => <ImageViewerApp windowId={id} fileAtom={fileAtom} />);
  };

  const menu = (
    <>
      <ContextMenuItem onClick={handleOpenImageViewer}>
        Open with Image Viewer
      </ContextMenuItem>
    </>
  );

  return (
    <FileButton
      iconName="imageFile"
      title={file.name}
      onDoubleClick={handleOpenImageViewer}
      onContextMenu={(ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        openMenu(() => menu);
      }}
    />
  );
}
