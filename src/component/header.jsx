import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo/admin-logo.png";

export function Header() {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-left">
            <Link className="logo" to="/dashboard">
              <img src={logo} alt="logo not found" />{" "}
            </Link>
          </div>
          <div className="header-right">
            <div className="left">
              <Link to="/account-statements/viewAdminAccounts" className="ac">
                Account Statements
              </Link>
            </div>
            <div className="right">
              <span className="credit-balance">
                <i className="fa-regular fa-money-bill-1" /> Credit Balance: USD 4000
              </span>
              <span className="admin-user">
                <i className="fa fa-user" /> Mr Jack <i className="fa fa-caret-down" />
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
