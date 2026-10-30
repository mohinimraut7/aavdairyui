// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { User, Lock, Building2, Eye, EyeOff, ArrowRight, Leaf } from "lucide-react";
// import loginBg from "../../assets/images/login-bg.png";
// import logo from "../../assets/images/logo.png";
// import { registerFarm } from "../../api/auth";

// export default function Register() {
//   const [form, setForm] = useState({
//     farmName: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }
//     setLoading(true);
//     try {
//       await registerFarm(form);
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed. Please try again.");
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
//             <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
//       <div className="absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-white/30" />

//       <div className="relative w-full max-w-md flex flex-col items-center px-6 pt-10">
//         <div className="flex justify-center">
//           <img src={logo} alt="AAV Dairy Farm Logo" className="w-32 h-32 object-contain" />
//         </div>

//         <div className="flex items-center gap-1.5 text-farm-green italic font-medium text-sm -mt-2 mb-1">
//           <Leaf size={14} className="fill-farm-green" />
//           Join
//         </div>
//         <h1 className="text-2xl font-extrabold tracking-wide text-gray-800 mb-1">AAV DAIRY FARM</h1>
//         <p className="text-xs text-gray-500 mb-6 text-center">Pure Milk. Healthy Life. Better Tomorrow.</p>

//         <div className="w-full bg-white rounded-[28px] shadow-xl px-7 pt-7 pb-6">
//           <div className="flex items-center gap-1.5 mb-1">
//             <h2 className="text-lg font-bold text-gray-800">Create Account</h2>
//             <Leaf size={16} className="text-farm-green fill-farm-green" />
//           </div>
//           <p className="text-sm text-gray-400 mb-5">Register your farm to get started</p>

//           {error && (
//             <div className="bg-red-50 text-red-600 text-sm rounded-2xl px-4 py-3 mb-4">{error}</div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
            

//             <div className="relative">
//               <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 name="username"
//                 value={form.username}
//                 onChange={handleChange}
//                 placeholder="Choose a username"
//                 className="w-full pl-11 pr-4 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
//                 required
//               />
//             </div>

//             <div className="relative">
//               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 placeholder="Create a password"
//                 className="w-full pl-11 pr-11 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
//                 required
//                 minLength={6}
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

//             <div className="relative">
//               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={form.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Re-enter password"
//                 className="w-full pl-11 pr-11 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword((v) => !v)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 aria-label={showConfirmPassword ? "Hide password" : "Show password"}
//               >
//                 {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-farm-green text-white py-3.5 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-farm-green-dark transition-colors disabled:opacity-60"
//             >
//               {loading ? "Creating Account..." : "Create Account"}
//               {!loading && <ArrowRight size={18} />}
//             </button>
//           </form>

//           <p className="text-center text-sm text-gray-500 mt-5">
//             Already have an account?{" "}
//             <Link to="/login" className="text-farm-green font-semibold">Sign in</Link>
//           </p>
//         </div>

//         <p className="text-center text-[11px] text-gray-400 mt-5 pb-6">© 2026 AAV Dairy Farm Management System</p>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { User, Lock, Building2, Eye, EyeOff, ArrowRight, Leaf, UserCog, ChevronDown, Mail, Phone } from "lucide-react";
import loginBg from "../../assets/images/login-bg.png";
import logo from "../../assets/images/logo.png";
import { registerFarm } from "../../api/auth";
import { ROLE_OPTIONS, CUSTOMER_ROLE } from "../../utils/permissions";
import { goAfterLogin } from "../../utils/session";

export default function Register() {
  const [form, setForm] = useState({
    farmName: "",
    username: "",
    // customer-only fields (role "customer")
    name: "",
    email: "",
    mobileNumber: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const isCustomer = form.role === CUSTOMER_ROLE;

  // username is always kept in small letters (backend also lowercases it)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "username" ? value.toLowerCase().trimStart() : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.role) {
      setError("Please select your role");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (isCustomer && !/^[6-9]\d{9}$/.test(form.mobileNumber)) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }
    setLoading(true);
    try {
      if (isCustomer) {
        // Customer: { name, email, role: "customer", mobileNumber, password } -> logged in straight to the store
        const res = await registerFarm({
          name: form.name.trim(),
          email: form.email.trim(),
          role: CUSTOMER_ROLE,
          mobileNumber: form.mobileNumber,
          password: form.password,
          confirmPassword: form.confirmPassword,
        });
        goAfterLogin(res.data, navigate, params.get("redirect"));
        return;
      }
      await registerFarm(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
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
      <div className="absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-white/30" />

      <div className="relative w-full max-w-md flex flex-col items-center px-6 pt-10">
        <div className="flex justify-center">
          <img src={logo} alt="AAV Dairy Farm Logo" className="w-32 h-32 object-contain" />
        </div>

        <div className="flex items-center gap-1.5 text-farm-green italic font-medium text-sm -mt-2 mb-1">
          <Leaf size={14} className="fill-farm-green" />
          Join
        </div>
        <h1 className="text-2xl font-extrabold tracking-wide text-gray-800 mb-1">AAV DAIRY FARM</h1>
        <p className="text-xs text-gray-500 mb-6 text-center">Pure Milk. Healthy Life. Better Tomorrow.</p>

        <div className="w-full bg-white rounded-[28px] shadow-xl px-7 pt-7 pb-6">
          <div className="flex items-center gap-1.5 mb-1">
            <h2 className="text-lg font-bold text-gray-800">Create Account</h2>
            <Leaf size={16} className="text-farm-green fill-farm-green" />
          </div>
          <p className="text-sm text-gray-400 mb-5">Select your role and create your account</p>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded-2xl px-4 py-3 mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <UserCog className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className={`w-full appearance-none pl-11 pr-10 py-3.5 rounded-full border border-gray-200 text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green ${
                  form.role ? "text-gray-800" : "text-gray-400"
                }`}
                required
              >
                <option value="" disabled>Select your role</option>
                {ROLE_OPTIONS.map((r) => (
                  <option key={r.value} value={r.value} className="text-gray-800">{r.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>

            {isCustomer ? (
              <>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" autoComplete="name"
                    className="w-full pl-11 pr-4 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green" required />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input name="mobileNumber" value={form.mobileNumber} inputMode="numeric" maxLength={10} autoComplete="tel"
                    onChange={(e) => setForm({ ...form, mobileNumber: e.target.value.replace(/\D/g, "") })}
                    placeholder="Mobile number" className="w-full pl-11 pr-4 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green" required />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email (optional)" autoComplete="email"
                    className="w-full pl-11 pr-4 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green" />
                </div>
              </>
            ) : (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  className="w-full pl-11 pr-4 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full pl-11 pr-11 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
                required
                minLength={6}
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

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="w-full pl-11 pr-11 py-3.5 rounded-full border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-farm-green text-white py-3.5 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-farm-green-dark transition-colors disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-farm-green font-semibold">Sign in</Link>
          </p>
        </div>

        <p className="text-center text-[11px] text-gray-400 mt-5 pb-6">© 2026 AAV Dairy Farm Management System</p>
      </div>
    </div>
  );
}
