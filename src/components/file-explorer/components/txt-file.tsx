import { openMenuAtom } from "@/components/context-menu/atoms";
import { Window } from "@/components/window";
import { addWindowAtom } from "@/components/window-manager/atoms";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import { useAtomValue, useSetAtom } from "jotai";
import { FileButton } from "./file-button";
import { FileAtom } from "@/lib/file-system-types";

type Props = {
  fileAtom: FileAtom;
};

export function TxtFile({ fileAtom }: Props) {
  const addWindow = useSetAtom(addWindowAtom);
  const openMenu = useSetAtom(openMenuAtom);
  const file = useAtomValue(fileAtom);

  const handleOpenTextEditor = () =>
    addWindow(async (id) => (
      <Window
        windowId={id}
        title={"Txt Viewer"}
        children={await file.content.text()}
      />
    ));

  const menu = (
    <>
      <ContextMenuItem onClick={handleOpenTextEditor}>
        Open with Text Editor
      </ContextMenuItem>
    </>
  );

  return (
    <FileButton
      title={file.name}
      iconName="textFile"
      onDoubleClick={handleOpenTextEditor}
      onContextMenu={(ev) => {
        ev.preventDefault();
        openMenu(() => menu);
      }}
    />
  );
}
