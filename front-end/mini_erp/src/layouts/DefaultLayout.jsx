import Header from "../components/Header";
import Menu from "../components/Menu";
export default function Layout({ children, titlePage, SubMenu }) {
  
  return (
    <div className="flex flex-row">
        <Menu></Menu>

        <div className="w-full">
          <Header titlePage={titlePage}></Header>
          <div className="w-full h-full">
            {SubMenu}
            {children}
          </div>
        </div>
      </div>
  );
}
