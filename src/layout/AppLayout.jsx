import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { AppShell, MainContent } from "../styles/common.js";

export default function AppLayout() {
  return (
    <>
      <AppShell>
        <Sidebar />
        <MainContent>
          <Outlet />
        </MainContent>
      </AppShell>
    </>
  );
}
