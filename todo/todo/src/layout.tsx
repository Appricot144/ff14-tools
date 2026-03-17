import { Outlet } from "react-router";
import {
  CheckSquareIcon,
  GitCommitIcon,
  GithubLogoIcon,
  ListIcon,
  MagnifyingGlassIcon,
  SunIcon,
  UserIcon,
} from "@phosphor-icons/react";
import "./layout.css";
import { useState } from "react";

function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <LayoutSideBar isOpen={isOpen} />

      <div className="content">
        <nav>
          <div className="rounded-md hover:bg-grey">
            <button onClick={() => setIsOpen(!isOpen)}>
              <ListIcon className="icon" size={25} />
            </button>
          </div>

          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button className="search-btn" type="button">
                <MagnifyingGlassIcon size={25} />
              </button>
            </div>
          </form>
          <button id="thema-btn">
            <SunIcon size={25} />
          </button>
          <button id="github-btn">
            <GithubLogoIcon size={25} />
          </button>
          <a
            href="#"
            className="profile rounded-full outline-1 outline-dark-grey"
          >
            <UserIcon size={25} />
          </a>
        </nav>
      </div>
      <main className={isOpen ? "open" : "close"}>
        <Outlet />
      </main>
    </>
  );
}

interface LayoutSideBarType {
  className?: string;
  isOpen: boolean;
}
function LayoutSideBar({ isOpen }: LayoutSideBarType) {
  const [active, setActive] = useState(0);
  return (
    <div className={`sidebar ${isOpen ? "open" : "close"}`}>
      <a href="#" className="logo">
        <CheckSquareIcon className="icon" size={40} />
        <div className="logo-name">
          <span>Tools</span>
        </div>
      </a>

      <ul className="side-menu">
        <li className={active === 0 ? "active" : ""}>
          <a href="/todo">
            <CheckSquareIcon className="icon" size={24} />
            Todo
          </a>
        </li>
        <li className={active === 1 ? "active" : ""}>
          <a href="/planner">
            <GitCommitIcon className="icon" size={24} />
            Rotation Planner
          </a>
        </li>
      </ul>
    </div>
  );
}

export { Layout };
