import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import Nprogress from "nprogress"
import { isAuth, signOut } from "../actions/auth";
import Router from "next/router";
// import "../node_modules/nprogress/nprogress.css"

Router.onRouteChangeStart = url => Nprogress.start();
Router.onRouteChangeComplete = url => Nprogress.done();
Router.onRouteChangeError = url => Nprogress.done();

const Header = () => {
  return (

    <>
    <Nav>
      <Link href="/" passHref>
        <Logo>SCI-FI BLOGS</Logo>
      </Link>
      <Menu >
        <Link href="/blogs" passHref>
          <MenuLink title="Blogs"  ><i className="fa fa-blog"></i></MenuLink>
        </Link>
        <Link href="/user/crud/blog" passHref>
          <MenuLink title="create a blog"><i className="fa fa-pen"></i></MenuLink>
        </Link>
        {!isAuth() && (
          <>
            <Link href="/signin" passHref>
              <MenuLink title="signIn" href="/signup"><i  className="fa fa-sign-in"></i></MenuLink>
            </Link>
            <Link href="/signup" passHref>
              <MenuLink title="signUp" href="/signup"><i className="fa fa-user-plus"></i></MenuLink>
            </Link>
          </>
        )}

        {isAuth() && (
          <>
            <Link href={isAuth().role === 1 ? "/admin" : "/user"} passHref>
              <MenuLink title={`${isAuth().name}`} href={isAuth().role === 1 ? "/admin" : "/user"}>
                <i class="fa fa-user" ></i>
              </MenuLink>
            </Link>
            <Link href="/signin" passHref>
              <MenuLink title="signOut" onClick={() => signOut(() => Router.push("/signin"))}>
              <i  className="fa fa-power-off"></i>
              </MenuLink>
            </Link>
          </>
        )}
      </Menu>
    </Nav>
   
    </>
  );
};

const Nav = styled.div`
  display: flex;
  background:rgb(9, 13, 15);
  box-shadow: 0 0 8px #f5f5f57f;
  flex-direction:column;
  align-items: flex-end;
  height : 100vh;
  position:fixed;
  width:12vw;
  z-index:100;

  @media (max-width: 768px) {
    height:70px;
    width:100%;
    flex-direction:row;
    align-items:center;
    justify-content :space-between;
  }

`;


const Logo = styled.a`
  text-decoration: none;
  color: silver;
  text-shadow:0 0 12px #4a2c2c99;
  font-weight: 600;
  margin:10px;

  @media (max-width: 768px) {
    margin-left:12px;
  }
  &:hover {
    color: white;
  }
`
const MenuLink = styled.a`
  font-weight: 400;
  text-decoration: none;
  color: silver;
  margin:10px;
  font-size:20px;
  border-radius:50%;
  padding:10px;
  padding-left:13px;
  padding-right:13px;

  &:hover {
    color: white;
    background-color: #ffffff17;
  }
  @media (max-width: 768px) {
    margin-left:5px;
    border-radius:50px;
    
  }
`;



const Menu = styled.div`
  display: flex;
  flex-direction:column;
  height: 55px;
  margin-top:100px;

  @media (max-width: 768px) {
    margin-top:-10px;
    margin-left:3vh;
    flex-direction:row;
  }
`;

export default Header;
