import { Window } from "@/components/window";
import { WindowId } from "@/components/window/atoms";
import { FileAtom } from "@/lib/file-system-types";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

type Props = {
  windowId: WindowId;
  fileAtom: FileAtom;
};

export function ImageViewerApp({ windowId, fileAtom }: Props) {
  const file = useAtomValue(fileAtom);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const url = URL.createObjectURL(file.content);
    setUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <Window windowId={windowId} title="Photos">
      {url && <img className="w-96 h-80 border-8 border-accent" src={url} />}
    </Window>
  );
}
