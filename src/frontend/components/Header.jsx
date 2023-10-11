import React from "react";

function Header() {
    return (
        <header className="dashboard--header">
            <div className="dashboard--header-text">
                <h1>RendezView Dashboard</h1>
                <p>
                    Welcome to RendezView. Please select an existing group or
                    create a new one.
                </p>
            </div>
            <button
                className={"dashboard--logout"}
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
