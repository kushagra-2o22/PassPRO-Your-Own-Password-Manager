

import { useRef, useEffect, useState } from 'react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const copyText = (text) => {
        toast('copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text);
    };

    const showPassword = () => {
        passwordRef.current.type = "text";
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png";
            passwordRef.current.type = "password";
        } else {
            ref.current.src = "icons/eyecross.png";
            passwordRef.current.type = "text";
        }
    };

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newPassword = { ...form, id: uuidv4() };
            const updatedPasswordArray = [...passwordArray, newPassword];
            setPasswordArray(updatedPasswordArray);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
            setform({ site: "", username: "", password: "" });
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast('Error: Password not saved!');
        }
    };

    const deletePassword = (id) => {
        let confirmDeletion = confirm("Do you really want to delete this password?");
        if (confirmDeletion) {
            const updatedArray = passwordArray.filter(item => item.id !== id);
            setPasswordArray(updatedArray);
            localStorage.setItem("passwords", JSON.stringify(updatedArray));
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const editPassword = (id) => {
         
        console.log("Editing password with id ", id)
        setform(passwordArray.filter(i=>i.id===id)[0]) 
        setPasswordArray(passwordArray.filter(item=>item.id!==id)) 

    }


    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]">
                </div>
            </div>
            {/* Added flex container for full height */}
            <div className="flex md:mycontainer flex-col min-h-[85.86vh]">
                <div className="p-3 flex-grow">
                    <h1 className="text-4xl font-bold text-center">
                        <span className="text-green-500">&lt;</span>
                        <span>Pass</span>
                        <span className="text-green-500">PRO/&gt;</span>
                    </h1>
                    <p className="text-green-900 text-lg text-center">Your own Password Manager</p>
                    <div className="text-black gap-8 flex flex-col p-4 items-center">
                        <input placeholder="Enter website URL" value={form.site} onChange={handlechange} type="text" name="site" className="rounded-full border border-green-500 w-full p-4 py-1" />
                        <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                            <input placeholder="Enter Username" value={form.username} onChange={handlechange} name="username" className="rounded-full border border-green-500 w-full p-4 py-1" type="text" />
                            <div className="relative">
                                <input ref={passwordRef} placeholder="Enter Password" value={form.password} onChange={handlechange} name="password" className="rounded-full border border-green-500 w-full p-4 py-1" type="password" />
                                <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={showPassword}>
                                    <img ref={ref} className="p-1" width={26} src="icons/eye.png" alt="eye" />
                                </span>
                            </div>
                        </div>
                        <button onClick={savePassword} className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-4 py-2 w-fit border border-green-900">
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover"
                            ></lord-icon>
                            Save
                        </button>
                    </div>
                    <div className="passwords">
                        <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
                        {passwordArray.length === 0 && <div>No passwords to show</div>}
                        {passwordArray.length !== 0 && (
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                                    <thead className="bg-green-800 text-white">
                                        <tr>
                                            <th className="py-2 px-4">Site</th>
                                            <th className="py-2 px-4">Username</th>
                                            <th className="py-2 px-4">Password</th>
                                            <th className="py-2 px-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-green-100">
                                        {passwordArray.map((item, index) => (
                                            <tr key={index} className="border-b">
                                                <td className="py-2 px-4">
                                                    <div className="flex items-center justify-center">
                                                        <a href={item.site} target="_blank" rel="noopener noreferrer" className="truncate">{item.site}</a>
                                                        <div className="ml-2 cursor-pointer" onClick={() => copyText(item.site)}>
                                                            <lord-icon
                                                                style={{ width: "25px", height: "25px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                            ></lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-2 px-4">
                                                    <div className="flex items-center justify-center">
                                                        <span className="truncate">{item.username}</span>
                                                        <div className="ml-2 cursor-pointer" onClick={() => copyText(item.username)}>
                                                            <lord-icon
                                                                style={{ width: "25px", height: "25px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                            ></lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-2 px-4">
                                                    <div className="flex items-center justify-center">
                                                        <span className="truncate">{item.password}</span>
                                                        <div className="ml-2 cursor-pointer" onClick={() => copyText(item.password)}>
                                                            <lord-icon
                                                                style={{ width: "25px", height: "25px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                            ></lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-2 px-4 text-center">
                                                    <span className="cursor-pointer mx-1" onClick={() => editPassword(item.id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/gwlusjdu.json"
                                                            trigger="hover"
                                                            style={{ width: "25px", height: "25px" }}
                                                        ></lord-icon>
                                                    </span>
                                                    <span className="cursor-pointer mx-1" onClick={() => deletePassword(item.id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="hover"
                                                            style={{ width: "25px", height: "25px" }}
                                                        ></lord-icon>
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
                
            </div>
        </>
    );
};

export default Manager;
