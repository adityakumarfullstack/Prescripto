import { useState } from "react"

const Login = () => {
    const [formType, setFormType] = useState("Sign Up");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <main className="login-page py-10 md:py-20">
            <section className="login-section">
                <div className="container">
                    <div className="login-form">
                        <form onSubmit={handleFormSubmit} className="mx-auto max-w-[440px]  flex flex-col gap-4 border border-gray-200 rounded-lg p-6 md:p-8 shadow-md">
                            <div className="form-header text-center">
                                <h2 className="title text-2xl">{formType === "Sign Up" ? "Create Account" : "Log In"}</h2>
                                <p>Please {formType === "Sign Up" ? "sign up" : "log in"} to book an appointment</p>
                            </div>
                            {
                                formType === "Sign Up" &&
                                <div className="form-group flex flex-col items-start">
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border border-gray-300 p-2 rounded-md mt-1.5 outline-none focus:border-primary transition ease-in-out duration-300" />
                                </div>
                            }
                            <div className="form-group flex flex-col items-start">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border border-gray-300 p-2 rounded-md mt-1.5 outline-none focus:border-primary transition ease-in-out duration-300" />
                            </div>
                            <div className="form-group flex flex-col items-start">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border border-gray-300 p-2 rounded-md mt-1.5 outline-none focus:border-primary transition ease-in-out duration-300" />
                            </div>
                            <button type="submit" className="btn-login bg-primary text-white text-lg border border-primary py-2 px-6 rounded-md text-shadow-lg hover:shadow-lg hover:text-shadow-none transition ease-in-out duration-300 cursor-pointer">{formType === "Sign Up" ? "Sign Up" : "Log In"}</button>
                            <div className="form-footer text-center">
                                <p>
                                    {formType === "Sign Up"
                                        ? "Already have an account?"
                                        : "Don't have an account?"}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormType(formType === "Sign Up" ? "Login" : "Sign Up")
                                        }
                                        className="form-toggle text-primary ml-1 font-semibold cursor-pointer hover:underline transition ease-in-out duration-300"
                                    >
                                        {formType === "Sign Up" ? "Log In" : "Sign Up"}
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Login