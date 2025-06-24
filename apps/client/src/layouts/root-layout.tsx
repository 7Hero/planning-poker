import { Outlet } from "react-router";
import { Header } from "../components/header";

const RootLayout = () => {
  return (
    <main className="h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
    </main>
  );
};

export { RootLayout };
