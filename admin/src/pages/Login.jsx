import { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify';


const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setAToken, backendUrl } = useContext(AdminContext);

    const handleSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (state === 'Admin') {
                const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
                if (data.success) {
                    localStorage.setItem('atoken', data.token);
                    setAToken(data.token);
                    console.log(data.token);
                } else {
                    toast.error(data.message);
                }
            } else {

            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(
                error.response?.data?.message || 'Something went wrong'
            );
        }
    };

    /* Important: Axios catch
    This is probably the issue with your login.
    If your backend returns an HTTP status like:
        res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    Axios considers 401 an error and jumps directly to catch.
    So this:
    else {toast.error(data.message);}
    will not execute.
    Instead, handle the error in catch too */

    return (
        <section className="login-page">
            <div className="container">
                <div className="form-wrapper min-h-dvh w-full flex items-center justify-center">
                    <form onSubmit={handleSubmitHandler} className="login-form flex flex-col gap-3 shadow-lg px-5 pt-4 pb-5 rounded-lg border border-gray-200 w-full max-w-[400px]">
                        <div className="form-header">
                            <h2 className='text-center text-xl md:text-2xl font-bold w-full'><span className="text-primary">{state}</span> Login</h2>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" required className='w-full border border-gray-200 rounded-md p-2 outline-none focus:border-primary transition ease-in-out duration-200' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" required className='w-full border border-gray-200 rounded-md p-2 outline-none focus:border-primary transition ease-in-out duration-200' />
                        </div>
                        <div className="form-group mt-3">
                            <button type="submit" className='w-full bg-primary text-white font-semibold rounded-md p-2.5 hover:bg-primary/90 hover:shadow transition ease-in-out duration-200 cursor-pointer'>Login</button>
                        </div>
                        <div className="form-footer text-center">
                            <p>
                                {state === "Admin" ? "Doctor Login?" : "Admin Login?"}{" "}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setState(state === "Admin" ? "Doctor" : "Admin")
                                    }
                                    className="font-semibold text-primary hover:underline transition duration-200 ease-in-out cursor-pointer"
                                >
                                    Click here
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login