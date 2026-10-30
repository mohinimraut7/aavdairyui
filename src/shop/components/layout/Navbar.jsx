import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LuMenu, LuSearch, LuShoppingCart, LuUser } from "react-icons/lu";
import Logo from "../common/Logo";
import SearchBox from "./SearchBox";
import MobileMenu from "./MobileMenu";
import { NAV_LINKS } from "./navLinks";
import { selectCartCount } from "../../redux/slices/cartSlice";
import { selectAccountLink, selectIsLoggedIn } from "../../redux/slices/authSlice";
import { setMobileMenu } from "../../redux/slices/uiSlice";

const linkClass = ({ isActive }) =>
  `relative whitespace-nowrap py-2 text-[15px] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[3px] after:rounded-full after:transition-all ${
    isActive
      ? "text-farm-800 after:bg-farm-800"
      : "text-ink hover:text-farm-800 after:bg-transparent"
  }`;

export default function Navbar() {
  const dispatch = useDispatch();
  const count = useSelector(selectCartCount);
  const loggedIn = useSelector(selectIsLoggedIn);
  const accountLink = useSelector(selectAccountLink);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream-light">
      <div className="container-x flex h-[76px] items-center gap-2 sm:h-[100px] sm:gap-4 lg:gap-8">
        <button
          className="-ml-1 grid h-10 w-10 place-items-center rounded-full text-farm-900 hover:bg-cream lg:hidden"
          aria-label="Open menu"
          onClick={() => dispatch(setMobileMenu(true))}
        >
          <LuMenu className="h-6 w-6" />
        </button>

        <Logo />

        <nav aria-label="Main" className="hidden flex-1 items-center justify-center gap-5 lg:flex xl:gap-8">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-2 lg:ml-0">
          <SearchBox className="hidden w-[250px] xl:block" />
          <Link to="/products" aria-label="Search products" className="hidden h-11 w-11 place-items-center rounded-full text-ink hover:bg-cream lg:grid xl:hidden">
            <LuSearch className="h-6 w-6" />
          </Link>
          <Link
            to={accountLink}
            aria-label={loggedIn ? "My account" : accountLink === "/dashboard" ? "Farm admin panel" : "Login"}
            className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-cream sm:h-11 sm:w-11"
          >
            <LuUser className="h-6 w-6" />
          </Link>
          <Link to="/cart" aria-label={`Cart, ${count} items`} className="relative grid h-10 w-10 place-items-center sm:h-11 sm:w-11 rounded-full text-ink hover:bg-cream">
            <LuShoppingCart className="h-6 w-6" />
            <span className="absolute top-0.5 right-0 grid h-5 min-w-5 place-items-center rounded-full bg-leaf px-1 text-[11px] font-bold text-white">
              {count}
            </span>
          </Link>
        </div>
      </div>
      <div className="container-x pb-3 lg:hidden">
        <SearchBox />
      </div>
      <MobileMenu />
    </header>
  );
}
