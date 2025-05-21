// src/components/Navbar.jsx
import React from "react";
import { Navbar as NS, NavbarBrand, Nav, NavItem, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import Location from "./Location"; // ← import here

export default function Navbar() {
  const { user } = useSelector((s) => s.auth);
  const cartCount = useSelector((s) => s.cart.items.length);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    nav("/auth");
  };

  return (
    <NS color="dark" dark expand="md" className="mb-4">
      <div className="container d-flex align-items-center">
        <NavbarBrand tag={Link} to="/">
          COFFEE
        </NavbarBrand>
        <Nav className="ms-auto align-items-center" navbar>
          <NavItem className="me-3">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </NavItem>
          <NavItem className="me-3">
            <Link to="/cart" className="nav-link">
              Cart ({cartCount})
            </Link>
          </NavItem>
          {!user ? (
            <NavItem className="me-3">
              <Link to="/auth">
                <Button color="secondary">Log in / Sign up</Button>
              </Link>
            </NavItem>
          ) : (
            <NavItem className="me-3">
              <Button color="warning" onClick={onLogout}>
                Logout
              </Button>
            </NavItem>
          )}
          <NavItem>
            <Location /> {/* ← embeds IP/Location at the right */}
          </NavItem>
        </Nav>
      </div>
    </NS>
  );
}
