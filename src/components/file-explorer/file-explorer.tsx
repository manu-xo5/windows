import { Window } from "@/components/window";
import { USER_NAME } from "@/constants";
import { useAtomValue } from "jotai";
import { WindowId } from "../window/atoms";
import { selectedFolderAtomAtom } from "./atoms";
import { Navbar } from "./components/navbar";
import { FileView, FolderItem } from "./file-view";
import { ScopeProvider } from "jotai-scope";

const defaultLocation = `/users/${USER_NAME}`;

type Props = {
  windowId: WindowId;
  location?: string;
};

export const FileExplorerImp: React.FC<Props> = ({
  windowId,
  location = defaultLocation,
}) => {
  const selectedFolderAtom = useAtomValue(selectedFolderAtomAtom);
  const folder = useAtomValue(selectedFolderAtom);
  console.log(folder);

  return (
    <Window windowId={windowId} title="File Explorer">
      <Navbar />

      <FileView>
        {Array.from(folder.children.values()).map((childAtom) => (
          <FolderItem
            key={childAtom.toString()}
            folderChildrenAtom={childAtom}
          />
        ))}
      </FileView>
    </Window>
  );
};

export const FileExplorer = (
  props: React.ComponentProps<typeof FileExplorerImp>,
) => (
  <ScopeProvider atoms={[selectedFolderAtomAtom]}>
    <FileExplorerImp {...props} />
  </ScopeProvider>
);
