import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MainPage() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
