import { TASKBAR_HEIGHT } from "@/constants";
import { useAtom, useSetAtom } from "jotai";
import { windowIdsAtom } from "../window-manager/atoms";
import { WindowId } from "../window/atoms";
import { useWindowAtoms } from "../window/use-window-atoms";

const TempStartButton = () => {
  return (
    <button
      style={{
        viewTransitionName: "taskbar_start_button",
      }}
      className="block"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-secondary"
        fill="none"
        viewBox="0 0 100 100"
        stroke="currentColor"
      >
        <rect
          className="text-blue-600"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          x="0"
          y="0"
          width="100"
          height="100"
          rx="10"
          fill="currentColor"
          opacity="30"
        />
        <line x1="0" x2="100" y1="50" y2="50" strokeWidth={4} />
        <line x1="50" x2="50" y1="0" y2="100" strokeWidth={4} />
      </svg>
    </button>
  );
};

export const Taskbar = () => {
  const [ids] = useAtom(windowIdsAtom);

  return (
    <div
      style={{
        viewTransitionName: "none",
        height: TASKBAR_HEIGHT,
      }}
      className="py-1 absolute z-20 w-full bottom-0 flex items-center justify-center bg-secondary gap-6"
    >
      <TempStartButton />

      {ids.map((id) => (
        <TaskbarButton windowId={id} />
      ))}
    </div>
  );
};

function TaskbarButton({ windowId }: { windowId: WindowId }) {
  const { restoreWinStateAtom, winStateAtom } = useWindowAtoms(windowId);
  const [winState, setWinState] = useAtom(winStateAtom);
  const restoreWinState = useSetAtom(restoreWinStateAtom);

  return (
    <button
      style={{
        viewTransitionName: "taskbar_item_" + windowId.id,
      }}
      key={windowId.id}
      className="inline-flex"
      onClick={() => {
        document.startViewTransition(() => {
          if (winState.current === "minimized") {
            restoreWinState();
          } else {
            setWinState("minimized");
          }
        });
      }}
    >
      <div className="bg-blue-400 inline-block w-6 h-6" />
    </button>
  );
}
