// // import { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import { Mail, Lock, Eye, EyeOff, ArrowRight, Leaf } from "lucide-react";
// // import loginBg from "../../assets/images/login-bg.png";
// // import logo from "../../assets/images/logo.png";
// // import { loginUser } from "../../api/auth";

// // export default function Login() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);
// //     try {
// //       const res = await loginUser({ email, password });
// //       localStorage.setItem("avv_token", res.data.token);
// //       localStorage.setItem("avv_user", JSON.stringify(res.data));
// //       navigate("/dashboard");
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Login failed. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen relative flex flex-col items-center overflow-hidden bg-farm-cream">
// //       <div
// //         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
// //         style={{ backgroundImage: `url(${loginBg})` }}
// //       />
// //       <div className="absolute inset-0 bg-linear-to-b from-farm-cream/ via-farm-cream/10 to-farm-cream" />

// //       <div className="relative w-full max-w-md flex flex-col items-center px-6 pt-10">
// //         <div className="flex justify-center">
// //           <img src={logo} alt="AAV Dairy Farm Logo" className="w-32 h-32 object-contain" />
// //         </div>

// //         <div className="flex items-center gap-1.5 text-farm-green italic font-medium text-sm -mt-2 mb-1">
// //           <Leaf size={14} className="fill-farm-green" />
// //           Welcome to
// //         </div>
// //         <h1 className="text-2xl font-extrabold tracking-wide text-gray-800 mb-1">AAV DAIRY FARM</h1>
// //         <p className="text-xs text-gray-500 mb-6 text-center">Pure Milk. Healthy Life. Better Tomorrow.</p>

// //         <div className="w-full bg-white rounded-[28px] shadow-xl px-7 pt-7 pb-6">
// //           <div className="flex items-center gap-1.5 mb-1">
// //             <h2 className="text-lg font-bold text-gray-800">Welcome Back!</h2>
// //             <Leaf size={16} className="text-farm-green fill-farm-green" />
// //           </div>
// //           <p className="text-sm text-gray-400 mb-5">Login to continue to your account</p>

// //           {error && (
// //             <div className="bg-red-50 text-red-600 text-sm rounded-2xl px-4 py-3 mb-4">{error}</div>
// //           )}

// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <div className="relative">
// //               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
// //               <input
// //                 type="email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 placeholder="Enter your email"
// //                 className="w-full pl-11 pr-4 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
// //                 required
// //               />
// //             </div>

// //             <div className="relative">
// //               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
// //               <input
// //                 type={showPassword ? "text" : "password"}
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 placeholder="Enter your password"
// //                 className="w-full pl-11 pr-11 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword((v) => !v)}
// //                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
// //                 aria-label={showPassword ? "Hide password" : "Show password"}
// //               >
// //                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// //               </button>
// //             </div>

// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="w-full bg-farm-green text-white py-3.5 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-farm-green-dark transition-colors disabled:opacity-60"
// //             >
// //               {loading ? "Logging in..." : "Login"}
// //               {!loading && <ArrowRight size={18} />}
// //             </button>
// //           </form>

// //           <div className="flex items-center gap-3 my-5">
// //             <div className="flex-1 h-px bg-gray-200" />
// //             <span className="text-xs text-gray-400">or</span>
// //             <div className="flex-1 h-px bg-gray-200" />
// //           </div>

// //           <p className="text-center text-sm text-gray-500 mt-5">
// //             Don't have an account?{" "}
// //             <Link to="/register" className="text-farm-green font-semibold">Sign Up</Link>
// //           </p>
// //         </div>

// //         <p className="text-center text-[11px] text-gray-400 mt-5 pb-6">© 2026 AAV Dairy Farm Management System</p>
// //       </div>
// //     </div>
// //   );
// // }


// // import { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import { User, Lock, Eye, EyeOff, ArrowRight, Leaf } from "lucide-react";
// // import loginBg from "../../assets/images/login-bg.png";
// // import logo from "../../assets/images/logo.png";
// // import { loginUser } from "../../api/auth";

// // export default function Login() {
// //   const [username, setUsername] = useState(""); const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);
// //     try {
// //       const res = await loginUser({username,password,});
// //       localStorage.setItem("avv_token", res.data.token);
// //       localStorage.setItem("avv_user", JSON.stringify(res.data));
// //       navigate("/dashboard");
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Login failed. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen relative flex flex-col items-center overflow-hidden bg-farm-cream">
// //       <div
// //         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
// //         style={{ backgroundImage: `url(${loginBg})` }}
// //       />
// //       <div className="absolute inset-0 bg-linear-to-b from-farm-cream/ via-farm-cream/10 to-farm-cream" />

// //       <div className="relative w-full max-w-md flex flex-col items-center px-6 pt-10">
// //         <div className="flex justify-center">
// //           <img src={logo} alt="AAV Dairy Farm Logo" className="w-32 h-32 object-contain" />
// //         </div>

// //         <div className="flex items-center gap-1.5 text-farm-green italic font-medium text-sm -mt-2 mb-1">
// //           <Leaf size={14} className="fill-farm-green" />
// //           Welcome to
// //         </div>
// //         <h1 className="text-2xl font-extrabold tracking-wide text-gray-800 mb-1">AAV DAIRY FARM</h1>
// //         <p className="text-xs text-gray-500 mb-6 text-center">Pure Milk. Healthy Life. Better Tomorrow.</p>

// //         <div className="w-full bg-white rounded-[28px] shadow-xl px-7 pt-7 pb-6">
// //           <div className="flex items-center gap-1.5 mb-1">
// //             <h2 className="text-lg font-bold text-gray-800">Welcome Back!</h2>
// //             <Leaf size={16} className="text-farm-green fill-farm-green" />
// //           </div>
// //           <p className="text-sm text-gray-400 mb-5">Login to continue to your account</p>

// //           {error && (
// //             <div className="bg-red-50 text-red-600 text-sm rounded-2xl px-4 py-3 mb-4">{error}</div>
// //           )}

// //           <form onSubmit={handleSubmit} className="space-y-4">

            
// //             <div className="relative">
// //             <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
// //             <input
// //               type="text"
// //               value={username}
// //               onChange={(e) => setUsername(e.target.value)}
// //               placeholder="Enter your username"
// //               className="w-full pl-11 pr-4 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
// //               required
// //             />
// //           </div>
            

// //             <div className="relative">
// //               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
// //               <input
// //                 type={showPassword ? "text" : "password"}
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 placeholder="Enter your password"
// //                 className="w-full pl-11 pr-11 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword((v) => !v)}
// //                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
// //                 aria-label={showPassword ? "Hide password" : "Show password"}
// //               >
// //                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// //               </button>
// //             </div>

// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="w-full bg-farm-green text-white py-3.5 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-farm-green-dark transition-colors disabled:opacity-60"
// //             >
// //               {loading ? "Logging in..." : "Login"}
// //               {!loading && <ArrowRight size={18} />}
// //             </button>
// //           </form>

// //           <div className="flex items-center gap-3 my-5">
// //             <div className="flex-1 h-px bg-gray-200" />
// //             <span className="text-xs text-gray-400">or</span>
// //             <div className="flex-1 h-px bg-gray-200" />
// //           </div>

// //           <p className="text-center text-sm text-gray-500 mt-5">
// //             Don't have an account?{" "}
// //             <Link to="/register" className="text-farm-green font-semibold">Sign Up</Link>
// //           </p>
// //         </div>

// //         <p className="text-center text-[11px] text-gray-400 mt-5 pb-6">© 2026 AAV Dairy Farm Management System</p>
// //       </div>
// //     </div>
// //   );
// // }










// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { User, Lock, Eye, EyeOff, ArrowRight, Leaf } from "lucide-react";
// import loginBg from "../../assets/images/login-bg.png";
// import logo from "../../assets/images/logo.png";
// import { loginUser } from "../../api/auth";

// export default function Login() {
//   const [username, setUsername] = useState(""); const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const res = await loginUser({username,password,});
//       localStorage.setItem("avv_token", res.data.token);
//       localStorage.setItem("avv_user", JSON.stringify(res.data));
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen relative flex flex-col items-center overflow-hidden bg-farm-cream">
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: `url(${loginBg})` }}
//       />
//       <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
//       <div className="absolute inset-0 bg-linear-to-b from-white/20 via-transparent to-white/50" />

//       <div className="relative w-full max-w-md flex flex-col items-center px-6 pt-10">
//         <div className="flex justify-center">
//           <img src={logo} alt="AAV Dairy Farm Logo" className="w-32 h-32 object-contain" />
//         </div>

//         <div className="flex items-center gap-1.5 text-farm-green italic font-medium text-sm -mt-2 mb-1">
//           <Leaf size={14} className="fill-farm-green" />
//           Welcome to
//         </div>
//         <h1 className="text-2xl font-extrabold tracking-wide text-gray-800 mb-1">AAV DAIRY FARM</h1>
//         <p className="text-xs text-gray-500 mb-6 text-center">Pure Milk. Healthy Life. Better Tomorrow.</p>

//         <div className="w-full bg-white rounded-[28px] shadow-xl px-7 pt-7 pb-6">
//           <div className="flex items-center gap-1.5 mb-1">
//             <h2 className="text-lg font-bold text-gray-800">Welcome Back!</h2>
//             <Leaf size={16} className="text-farm-green fill-farm-green" />
//           </div>
//           <p className="text-sm text-gray-400 mb-5">Login to continue to your account</p>

//           {error && (
//             <div className="bg-red-50 text-red-600 text-sm rounded-2xl px-4 py-3 mb-4">{error}</div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">

            
//             <div className="relative">
//             <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Enter your username"
//               className="w-full pl-11 pr-4 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
//               required
//             />
//           </div>
            

//             <div className="relative">
//               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 className="w-full pl-11 pr-11 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((v) => !v)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-farm-green text-white py-3.5 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-farm-green-dark transition-colors disabled:opacity-60"
//             >
//               {loading ? "Logging in..." : "Login"}
//               {!loading && <ArrowRight size={18} />}
//             </button>
//           </form>

//           <div className="flex items-center gap-3 my-5">
//             <div className="flex-1 h-px bg-gray-200" />
//             <span className="text-xs text-gray-400">or</span>
//             <div className="flex-1 h-px bg-gray-200" />
//           </div>

//           <p className="text-center text-sm text-gray-500 mt-5">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-farm-green font-semibold">Sign Up</Link>
//           </p>
//         </div>

//         <p className="text-center text-[11px] text-gray-400 mt-5 pb-6">© 2026 AAV Dairy Farm Management System</p>
//       </div>
//     </div>
//   );
// }



// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Mail, Lock, Eye, EyeOff, ArrowRight, Leaf } from "lucide-react";
// import loginBg from "../../assets/images/login-bg.png";
// import logo from "../../assets/images/logo.png";
// import { loginUser } from "../../api/auth";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const res = await loginUser({ email, password });
//       localStorage.setItem("avv_token", res.data.token);
//       localStorage.setItem("avv_user", JSON.stringify(res.data));
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen relative flex flex-col items-center overflow-hidden bg-farm-cream">
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: `url(${loginBg})` }}
//       />
//       <div className="absolute inset-0 bg-linear-to-b from-farm-cream/ via-farm-cream/10 to-farm-cream" />

//       <div className="relative w-full max-w-md flex flex-col items-center px-6 pt-10">
//         <div className="flex justify-center">
//           <img src={logo} alt="AAV Dairy Farm Logo" className="w-32 h-32 object-contain" />
//         </div>

//         <div className="flex items-center gap-1.5 text-farm-green italic font-medium text-sm -mt-2 mb-1">
//           <Leaf size={14} className="fill-farm-green" />
//           Welcome to
//         </div>
//         <h1 className="text-2xl font-extrabold tracking-wide text-gray-800 mb-1">AAV DAIRY FARM</h1>
//         <p className="text-xs text-gray-500 mb-6 text-center">Pure Milk. Healthy Life. Better Tomorrow.</p>

//         <div className="w-full bg-white rounded-[28px] shadow-xl px-7 pt-7 pb-6">
//           <div className="flex items-center gap-1.5 mb-1">
//             <h2 className="text-lg font-bold text-gray-800">Welcome Back!</h2>
//             <Leaf size={16} className="text-farm-green fill-farm-green" />
//           </div>
//           <p className="text-sm text-gray-400 mb-5">Login to continue to your account</p>

//           {error && (
//             <div className="bg-red-50 text-red-600 text-sm rounded-2xl px-4 py-3 mb-4">{error}</div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="relative">
//               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="w-full pl-11 pr-4 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
//                 required
//               />
//             </div>

//             <div className="relative">
//               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 className="w-full pl-11 pr-11 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((v) => !v)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-farm-green text-white py-3.5 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-farm-green-dark transition-colors disabled:opacity-60"
//             >
//               {loading ? "Logging in..." : "Login"}
//               {!loading && <ArrowRight size={18} />}
//             </button>
//           </form>

//           <div className="flex items-center gap-3 my-5">
//             <div className="flex-1 h-px bg-gray-200" />
//             <span className="text-xs text-gray-400">or</span>
//             <div className="flex-1 h-px bg-gray-200" />
//           </div>

//           <p className="text-center text-sm text-gray-500 mt-5">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-farm-green font-semibold">Sign Up</Link>
//           </p>
//         </div>

//         <p className="text-center text-[11px] text-gray-400 mt-5 pb-6">© 2026 AAV Dairy Farm Management System</p>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { User, Lock, Eye, EyeOff, ArrowRight, Leaf } from "lucide-react";
// import loginBg from "../../assets/images/login-bg.png";
// import logo from "../../assets/images/logo.png";
// import { loginUser } from "../../api/auth";

// export default function Login() {
//   const [username, setUsername] = useState(""); const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const res = await loginUser({username,password,});
//       localStorage.setItem("avv_token", res.data.token);
//       localStorage.setItem("avv_user", JSON.stringify(res.data));
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen relative flex flex-col items-center overflow-hidden bg-farm-cream">
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: `url(${loginBg})` }}
//       />
//       <div className="absolute inset-0 bg-linear-to-b from-farm-cream/ via-farm-cream/10 to-farm-cream" />

//       <div className="relative w-full max-w-md flex flex-col items-center px-6 pt-10">
//         <div className="flex justify-center">
//           <img src={logo} alt="AAV Dairy Farm Logo" className="w-32 h-32 object-contain" />
//         </div>

//         <div className="flex items-center gap-1.5 text-farm-green italic font-medium text-sm -mt-2 mb-1">
//           <Leaf size={14} className="fill-farm-green" />
//           Welcome to
//         </div>
//         <h1 className="text-2xl font-extrabold tracking-wide text-gray-800 mb-1">AAV DAIRY FARM</h1>
//         <p className="text-xs text-gray-500 mb-6 text-center">Pure Milk. Healthy Life. Better Tomorrow.</p>

//         <div className="w-full bg-white rounded-[28px] shadow-xl px-7 pt-7 pb-6">
//           <div className="flex items-center gap-1.5 mb-1">
//             <h2 className="text-lg font-bold text-gray-800">Welcome Back!</h2>
//             <Leaf size={16} className="text-farm-green fill-farm-green" />
//           </div>
//           <p className="text-sm text-gray-400 mb-5">Login to continue to your account</p>

//           {error && (
//             <div className="bg-red-50 text-red-600 text-sm rounded-2xl px-4 py-3 mb-4">{error}</div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">

            
//             <div className="relative">
//             <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Enter your username"
//               className="w-full pl-11 pr-4 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
//               required
//             />
//           </div>
            

//             <div className="relative">
//               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 className="w-full pl-11 pr-11 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((v) => !v)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-farm-green text-white py-3.5 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-farm-green-dark transition-colors disabled:opacity-60"
//             >
//               {loading ? "Logging in..." : "Login"}
//               {!loading && <ArrowRight size={18} />}
//             </button>
//           </form>

//           <div className="flex items-center gap-3 my-5">
//             <div className="flex-1 h-px bg-gray-200" />
//             <span className="text-xs text-gray-400">or</span>
//             <div className="flex-1 h-px bg-gray-200" />
//           </div>

//           <p className="text-center text-sm text-gray-500 mt-5">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-farm-green font-semibold">Sign Up</Link>
//           </p>
//         </div>

//         <p className="text-center text-[11px] text-gray-400 mt-5 pb-6">© 2026 AAV Dairy Farm Management System</p>
//       </div>
//     </div>
//   );
// }










import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { User, Lock, Eye, EyeOff, ArrowRight, Leaf } from "lucide-react";
import loginBg from "../../assets/images/login-bg.png";
import logo from "../../assets/images/logo.png";
import { loginUser } from "../../api/auth";
import { goAfterLogin } from "../../utils/session";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await loginUser({ username: username.trim().toLowerCase(), password });
      // customer -> online store, Doctor / Caretaker / Administrator -> admin panel
      goAfterLogin(res.data, navigate, params.get("redirect"));
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center overflow-hidden bg-farm-cream">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${loginBg})` }}
      />
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-linear-to-b from-white/20 via-transparent to-white/50" />

      <div className="relative w-full max-w-md flex flex-col items-center px-6 pt-10">
        <div className="flex justify-center">
          <img src={logo} alt="AAV Dairy Farm Logo" className="w-32 h-32 object-contain" />
        </div>

        <div className="flex items-center gap-1.5 text-farm-green italic font-medium text-sm -mt-2 mb-1">
          <Leaf size={14} className="fill-farm-green" />
          Welcome to
        </div>
        <h1 className="text-2xl font-extrabold tracking-wide text-gray-800 mb-1">AAV DAIRY FARM</h1>
        <p className="text-xs text-gray-500 mb-6 text-center">Pure Milk. Healthy Life. Better Tomorrow.</p>

        <div className="w-full bg-white rounded-[28px] shadow-xl px-7 pt-7 pb-6">
          <div className="flex items-center gap-1.5 mb-1">
            <h2 className="text-lg font-bold text-gray-800">Welcome Back!</h2>
            <Leaf size={16} className="text-farm-green fill-farm-green" />
          </div>
          <p className="text-sm text-gray-400 mb-5">Login to continue to your account</p>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded-2xl px-4 py-3 mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            
            <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              placeholder="Username, email or mobile number"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              className="w-full pl-11 pr-4 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
              required
            />
          </div>
            

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-11 pr-11 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-farm-green text-white py-3.5 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-farm-green-dark transition-colors disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <p className="text-center text-sm text-gray-500 mt-5">
            Don't have an account?{" "}
            <Link to={`/register${params.get("redirect") ? `?redirect=${encodeURIComponent(params.get("redirect"))}` : ""}`} className="text-farm-green font-semibold">Sign Up</Link>
          </p>
        </div>

        <p className="text-center text-[11px] text-gray-400 mt-5 pb-6">© 2026 AAV Dairy Farm Management System</p>
      </div>
    </div>
  );
}