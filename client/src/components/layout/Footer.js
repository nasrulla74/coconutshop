import React from "react";

export default () => {
  return (
    <footer className="bg-dark text-white mt-1 p-2 text-center">
      <div className="card text-white bg-dark mb-3">
        <div className="card-header">Contact Us</div>
        <div className="card-body">
          <h5 className="card-title">Guest Service of Coconut Shop</h5>
          <small className="card-text">
            Shop No 1/31, Chandhanee Magu, Male' Maldives Telephone : (960)
            300-6663 | Mobile : (960) 777 2081 | (960) 980 9097
            <p>Email : airport@coconutshoponline.com</p>
          </small>
        </div>
      </div>
      <small>
        Copyright &copy; {new Date().getFullYear()} coconutshoponline.com
      </small>
    </footer>
  );
};
