import icon from "../../assets/react.svg";
import { IconBlock, SidebarBlock } from "./Sidebar.styled";

export default function Sidebar() {
  return (
    <>
      <SidebarBlock>
        <IconBlock src={icon} />
      </SidebarBlock>
    </>
  );
}
