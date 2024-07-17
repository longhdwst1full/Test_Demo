import React from 'react';
import NavbarDash from '../Navbar';

interface IProps {
  children: React.ReactNode;
}
export default function Layout(props: IProps) {
  // const { pathname, push } = useRouter();

  // const [isLogin, setIsLogin] = React.useState<boolean>(false);

  // React.useEffect(() => {
  //   const jwt = getAuthLocalData();
  //   if (!jwt) {
  //     push('/login');
  //   } else {
  //     setIsLogin(true);
  //   }
  // }, []);

  return (
    <div id="layout">
      {/* <BaseLoading /> */}
      {/* {isLogin && <React.Fragment>{pathname !== '/login' ? <Navbar>{props.children}</Navbar> : <>{props.children}</>}</React.Fragment>} */}
      <NavbarDash> {props.children}</NavbarDash> 
    </div>
  );
}
 
