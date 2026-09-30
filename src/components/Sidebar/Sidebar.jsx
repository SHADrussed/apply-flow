import { Link, NavLink } from "react-router-dom";
import { LogoBlock, NavigaionBlock, SidebarBlock } from "./Sidebar.styled";

export default function Sidebar() {
  return (
    <>
      <SidebarBlock>
        {/* Сделать логотип */}
        <LogoBlock>
          <h2>ApplyFlow</h2>
        </LogoBlock>
        <NavigaionBlock>
          <Link accent>
            <NavLink to={"/"}>Dashboard</NavLink>
          </Link>
          <Link accent>
            <NavLink to={"vacancies"}>Vacancies</NavLink>
          </Link>
        </NavigaionBlock>
      </SidebarBlock>
    </>
  );
}
