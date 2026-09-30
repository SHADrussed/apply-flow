import {
  LogoBlock,
  NavigationBlock,
  NavigationLink,
  SidebarBlock,
} from "./Sidebar.styled";
import { LayoutDashboard, BriefcaseBusiness } from "lucide-react";

export default function Sidebar() {
  return (
    <>
      <SidebarBlock>
        <LogoBlock>
          <h2>ApplyFlow</h2>
        </LogoBlock>
        <NavigationBlock>
          <NavigationLink to="/" end>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavigationLink>

          <NavigationLink to="/vacancies">
            <BriefcaseBusiness size={18} />
            <span>Vacancies</span>
          </NavigationLink>
        </NavigationBlock>
      </SidebarBlock>
    </>
  );
}
