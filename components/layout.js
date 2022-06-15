import Header from "./header";
import styled from "styled-components";

const Layout = ({ children }) => {
  return (
  
      <div className="row">
        <div className="col-md-2">
          <Header />
        </div>
        <div className="col-md-10">{children}</div>
      </div>
  );
};

export default Layout;
