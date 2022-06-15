import Link from "next/link";
import { useState } from "react";
import Nprogress from "nprogress"
import { isAuth, signOut } from "../actions/auth";
import Router from "next/router";

Router.onRouteChangeStart = url => Nprogress.start();
Router.onRouteChangeComplete = url => Nprogress.done();
Router.onRouteChangeError = url => Nprogress.done();

const Header = () => {
  return (

  
    <div id="nav">
      <Link href="/" passHref>
        <a id="logo">SCI-FI BLOGS</a>
      </Link>
      <div className="menu-container" >
        <Link href="/blogs" passHref>
          <a id="menulink" title="Blogs"  ><i className="fa fa-blog"></i></a >
        </Link>
        <Link href="/user/crud/blog" passHref>
          <a id="menulink" title="create a blog"><i className="fa fa-pen"></i></a >
        </Link>
        {!isAuth() && (
          <>
            <Link href="/signin" passHref>
              <a id="menulink" title="signIn" href="/signup"><i  className="fa fa-sign-in"></i></a >
            </Link>
            <Link href="/signup" passHref>
              <a id="menulink" title="signUp" href="/signup"><i className="fa fa-user-plus"></i></a>
            </Link>
          </>
        )}

        {isAuth() && (
          <>
            <Link href={isAuth().role === 1 ? "/admin" : "/user"} passHref>
              <a id="menulink" title={`${isAuth().name}`} href={isAuth().role === 1 ? "/admin" : "/user"}>
                <i class="fa fa-user" ></i>
              </a >
            </Link>
            <Link href="/signin" passHref>
              <a id="menulink" title="signOut" onClick={() => signOut(() => Router.push("/signin"))}>
              <i  className="fa fa-power-off"></i>
              </a>
            </Link>
          </>
        )}
      </div>
    </div>
  
  );
};


export default Header;
