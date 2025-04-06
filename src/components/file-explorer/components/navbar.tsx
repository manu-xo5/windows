import { IconButton } from "@/components/ui/icon-button";

export function Navbar() {
  return (
    <nav className="bg-accent flex items-center px-1 gap-x-2 p-1 border-b">
      <div className="flex gap-1.5">
        <IconButton
          title="Back"
          iconName="back"
          onClick={() => {
            console.error("not implemented");
          }}
        />

        <IconButton
          title="Forward"
          iconName="forward"
          onClick={() => {
            console.error("not implemented");
          }}
        />

        <IconButton
          title="Up a folder"
          iconName="up"
          onClick={() => {
            console.error("not implemented");
          }}
        />

        <IconButton
          title="Refresh"
          iconName="refresh"
          onClick={() => {
            console.error("not implemented");
          }}
        />
      </div>

      <p className="bg-hover flex-1 p-1 px-2 rounded">/users/manu-xo5</p>
    </nav>
  );
}
