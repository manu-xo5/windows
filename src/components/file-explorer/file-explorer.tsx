import { Window } from "@/components/window";
import { USER_NAME } from "@/constants";
import { useState } from "react";

const defaultLocation = `/users/${USER_NAME}`;

type Props = {
  location?: string;
};
export const FileExplorer: React.FC<Props> = ({
  location = defaultLocation,
}) => {
  const [count, setCount] = useState(0);

  return (
    <Window title={"File Explorer " + location}>
      <div>
        <p>{count}</p>
        <button onClick={() => setCount((p) => ++p)}>inc</button>
      </div>
    </Window>
  );
};
