import React from "react";
import "./LogoutPopupStyle.css";
const LogoutPopup = (props) => {
  console.log("print data", props);
  return (
    <React.Fragment>
      <div className={`popup-outer ${props.show ? "show-popup" : ""}`}>
        <div className="popup-container delete-poup">
          <div className="popup-header">
            <div className="popup-heading">
              Logout
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="close-btn"
                onClick={props.handleClose}>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8243 5.02426C16.0586 4.78995 16.0586 4.41005 15.8243 4.17574C15.5899 3.94142 15.2101 3.94142 14.9757 4.17574L10 9.15147L5.02426 4.17574C4.78995 3.94142 4.41005 3.94142 4.17574 4.17574C3.94142 4.41005 3.94142 4.78995 4.17574 5.02426L9.15147 10L4.17574 14.9757C3.94142 15.2101 3.94142 15.5899 4.17574 15.8243C4.41005 16.0586 4.78995 16.0586 5.02426 15.8243L10 10.8485L14.9757 15.8243C15.2101 16.0586 15.5899 16.0586 15.8243 15.8243C16.0586 15.5899 16.0586 15.2101 15.8243 14.9757L10.8485 10L15.8243 5.02426Z" fill="#101010" />
              </svg>
            </div>

            <div className="popup-header-body">
              <div className="header-left">
                <p className="text-7">
                  Are you sure you want to logout?{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="popup-footer mt-40">
            <div className="btn-group">
              <button onClick={props.handleClose} className="dark-btn-outline">
                cancel
              </button>
              <button
                onClick={props.onLogout}
                className="secondary-btn"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LogoutPopup;
