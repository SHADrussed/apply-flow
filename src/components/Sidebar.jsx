import icon from "../assets/react.svg";
import Dashboard from "./Dashboard";
import { IconBlock, SidebarBlock } from "./Sidebar.styled";
import Vacancies from "./Vacancies";

export default function Sidebar() {
  return (
    <>
      <SidebarBlock>
        <IconBlock src={icon} />
        <Dashboard />
        <Vacancies />
      </SidebarBlock>
    </>
  );
}
