import React from "react";
import logo from './../authPage/logo.png'
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import {VscArrowUp} from 'react-icons/vsc'
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
 
// profile menu component
const profileMenuItems = [
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];
 
function ProfileMenu() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [cookies,setCookie,removeCookie] = useCookies([]);
  function Logout(){
      removeCookie("jwt");
      navigate("/login");
  };
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <VscArrowUp
            size = {20}
            className={`transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1 bg-slate-700">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
           
              <MenuItem
                key={label}
                onClick={isLastItem ? Logout : closeMenu}
                className={`flex items-center gap-2 rounded matchColor ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
        
          );
        })}
      </MenuList>
    </Menu>
  );
}
 

 
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 

 
  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem className="hidden items-center gap-2 font-medium text-blue-gray-900 lg:flex lg:rounded-full">
              <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
              Pages{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
          </Card>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 font-medium text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
        Pages{" "}
      </MenuItem>
    </React.Fragment>
  );
}
 
// nav list component
const navListItems = [
  {
    label: "Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Dashboard",
    icon: CubeTransparentIcon,
  },
  {
    label: "Blogs",
    icon: CodeBracketSquareIcon,
  },
];
 
function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon }, key) => (
        <Typography
          key={label}
          as="a"
          href="#"
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            <span className="text-white"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}
 
export default function UserNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <Navbar className="w-screen min-w-full bg-gradient-to-t from-violet-900 via-gray-800 to-red-700 border-none">
      <div className="relative mx-auto flex items-center justify-around text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          <div className="flex flex-row gap-5 ">
            <img src = {logo} width={25} height={25}></img>
            <h1>BLOGGO</h1>
          </div>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <Collapse open={isNavOpen} className="overflow-hidden">
        <NavList />
      </Collapse>
    </Navbar>
  );
}