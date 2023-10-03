function userLogin() {
    return (
    <div>
        <h2>
            Login
        </h2>
        <form action = "/userLogin" method = "POST">
            <div>
                <label htmlFor = "un">Username</label>
                <input type = "text" id = "un" name = "username"/>
            </div>
            <div>
                <label htmlFor = "pw">Password</label>
                <input type = "password" id = "pw" name = "password"/>
            </div>
            <button>Login</button>
        </form>
    </div> )
}

export default userLogin