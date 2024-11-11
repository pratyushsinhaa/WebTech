import { RxHamburgerMenu } from "react-icons/rx"
import { Button } from "./ui"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <nav className="bg-white z-50 border-gray-200 dark:bg-[#262522] borbder-b shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        
        <div
          className={`w-full lg:hidden flex flex-col md:w-auto items-center ${
            isMenuOpen ? "" : "hidden"
          }`}
          id="navbar-default"
        >
          
          <Button
            className="bg-transparent mx-4 hover:bg-black w-[50%]"
            onClick={() => navigate("/game")}
          >
            Game1
          </Button>
        </div>
        
      </div>
    </nav>
  )
}
