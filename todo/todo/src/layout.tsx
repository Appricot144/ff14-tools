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

export default function Layout() {
  return (
    <>
      <div className="sidebar">
        <a href="#" className="logo">
          <CheckSquareIcon className="icon" size={40} />
          <div className="logo-name">
            <span>Tools</span>
          </div>
        </a>

        <ul className="side-menu">
          <li className="active">
            <a href="/todo">
              <CheckSquareIcon className="icon" size={24} />
              Todo
            </a>
          </li>
          <li>
            <a href="/planner">
              <GitCommitIcon className="icon" size={24} />
              Rotation Planner
            </a>
          </li>
        </ul>
      </div>

      <div className="content">
        <nav>
          <ListIcon className="icon" size={25} />

          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button className="search-btn" type="submit">
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
      <main>
        <Outlet />
      </main>
    </>
  );
}
