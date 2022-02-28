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
        <ul className={`${isOpen && "open"}`}>
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
              to="/entries"
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

  .logo {
    height: 100%;

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
    top: 3rem;
    right: 1rem;
    width: 3rem;
    height: 2.1rem;

    .bar {
      width: 100%;
      height: 3px;
      border-radius: 1rem;
      background-color: white;
    }
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;

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
      font-size: 2rem;
      margin: 0;
      padding: 1rem;
    }
  }
`;

export default Header;
