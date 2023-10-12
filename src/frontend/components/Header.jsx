import React from "react";

function Header() {
    return (
        <header className="dashboard--header">
            <div className="dashboard--header-text">
                <h1>RendezView</h1>
                <p>
                    Welcome to RendezView. Please select a group or
                    create a new one.
                </p>
            </div>
            <button
                className={"dashboard--logout interactable"}
                type={"submit"}
                onClick={(e) => {
                    e.preventDefault();
                    fetch("/unAuth", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: "",
                    }).then(() => window.location.reload());
                }}
            >
                Log Out
            </button>
        </header>
    );
}

export default Header;
