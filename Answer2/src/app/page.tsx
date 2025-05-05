import SideBar from "./components/sidebar/SideBar";
import MainOverView from "./components/main/OverView";

export default function Home() {
  return (
    <div
      className="flex min-h-screen"
      style={{
        backgroundImage: 'url(/images/bg-main.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Sidebar อยู่ซ้าย */}
      <SideBar />

      {/* Main content อยู่ขวา */}
      <div className="flex-1 overflow-auto">
        <MainOverView />
      </div>
    </div>
  );
}

