'use client'

import DonePage from "../components/sidebar/Done"
import SideBar from "../components/sidebar/SideBar"


export default function Done() {
  return (
    <div className="flex min-h-screen"
      style={{
        backgroundImage: 'url(/images/bg-main.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <SideBar />
      <div className="flex-1 overflow-auto">
        <DonePage />
      </div>
    </div>
  )
}
