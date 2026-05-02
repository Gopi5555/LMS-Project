import Sidebar from "./SideBar";

function Layout({ children }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      {children}
    </div>
  );
}

export default Layout;