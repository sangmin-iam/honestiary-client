import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

import logo from "../assets/images/logo.png";
import useLogout from "../hooks/useLogout";

function Header() {
  const navigate = useNavigate();

  const { isLoggedIn, handleLogout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <div className="logo">
        <img src={logo} onClick={() => navigate("/")} />
      </div>
      <nav>
        <a
          className="toggle-button"
          onClick={() => setIsOpen((toggle) => !toggle)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        <ul
          className={`${isOpen && "open"}`}
          onClick={() => setIsOpen((toggle) => !toggle)}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/write"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Write
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/entries/list"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Entries
            </NavLink>
          </li>
          <li>
            {isLoggedIn ? (
              <a onClick={handleLogout}>Logout</a>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 10vh;
  box-shadow: 0 1px 10px 1px rgba(0, 0, 0, 0.5);
  background-color: ${({ theme }) => theme.colors.blueGreen};
  font-weight: 300;

  .logo {
    height: 100%;
    margin-left: 1rem;
    margin-top: 1rem;

    img {
      height: 10vh;
      cursor: pointer;
    }
  }

  ul {
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 2.25rem;
  }

  li {
    margin-right: 10rem;
  }

  a {
    color: ${({ theme }) => theme.colors.white};
    padding: 0.3rem;
  }

  .active {
    border-bottom: 2px solid ${({ theme }) => theme.colors.white};
  }

  .toggle-button {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 4vh;
    right: 10px;
    width: 30px;
    height: 21px;

    .bar {
      width: 100%;
      height: 3px;
      border-radius: 10px;
      background-color: white;
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopM}) {
    ul {
      font-size: 2rem;
    }

    li {
      margin-right: 7rem;
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.laptopS}) {
    ul {
      font-size: 1.85rem;
    }

    li {
      margin-right: 6rem;
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.devices.mobile}) {
    flex-direction: column;
    font-size: 2rem;

    .logo {
      display: flex;
      justify-content: center;
    }

    .toggle-button {
      display: flex;
    }

    ul {
      display: none;
      flex-direction: column;
    }

    ul.open {
      display: flex;
    }

    li {
      margin: 0;
      padding: 1rem;
    }
  }
`;

export default Header;
