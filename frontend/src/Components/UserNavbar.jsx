import React from "react";
import logo from './../logo.png'
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import {VscArrowUp} from 'react-icons/vsc';
import {useEffect,useState} from 'react'
import SearchBar from "./SearchBar";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  PowerIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
 
const profileMenuItems = [
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];
 
function ProfileMenu() {
  
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [cookie,removeCookie] = useCookies([]);
  const navigate = useNavigate();

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
// nav list component

 
function NavList(props) {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {props.list.map(({ label, icon,onClick }, key) => (
        <Typography
          key={label}
          as="a"
          href="#"
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full" onClick={onClick}>
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            <span className="text-white"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}
 
export default function UserNavbar(props) {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [userData,setUserData] = useState({
    username: '',
    id: ''
  });
  const navigate = useNavigate();
  const [cookie] = useCookies([]);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const navListItems = [
    {
      label: "Profile",
      icon: UserCircleIcon,
      onClick: () => navigate(`/Profile?username=${encodeURIComponent(userData.username)}`)
    },
    {
      label: "Dashboard",
      icon: CubeTransparentIcon,
      onClick: () => navigate(`/DashBoard?username=${encodeURIComponent(userData.username)}&id=${encodeURIComponent(userData.id)}`)
    },
    {
      label: "Blogs",
      icon: CodeBracketSquareIcon,
      onClick: () => navigate("/Blogs")
    },
  ];
  useEffect(()=>{
    const verify_user = async()=>{
    if(!cookie.jwt)
        navigate('/Login');
    else{ 
        
        const res = await fetch('http://localhost:5000/verify',{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await res.json();
        setUserData({
          username: result.username,
          id: result.id
        });
        console.log(result);
        if(!result.status) navigate('/Login');
        
        return result;
    }
 }
 verify_user();
},[]);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <Navbar className="w-screen min-w-full bg-gradient-to-t from-violet-900 via-gray-800 to-red-700 border-none">
      <div className="mx-auto flex flex-row items-center text-blue-gray-900 gap-2 justify-between py-1">
        <div className="flex flex-row gap-2 justify-start">
          <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
          >
          <div className="flex flex-row">
            <img src = {logo} width={25} height={25}></img>
            <h1>LOGGO</h1>
          </div>
          </Typography>
          <div className="hidden lg:block">
            <NavList list = {navListItems}/>
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
        </div>
        <div className="flex flex-row gap-2 justify-end">
          <SearchBar query = {props.query} search = {props.search} refreshSearch = {props.refreshSearch} refresh = {props.refresh}/>
          <ProfileMenu/>
        </div>
      </div>
      <Collapse open={isNavOpen} className="overflow-hidden">
        <NavList list = {navListItems}/>
      </Collapse>
    </Navbar>
  );
}