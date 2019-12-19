import React from "react";
import classnames from "classnames";
import styles from "./Menu.module.css";

import { Content } from "../Content";
import { Logo } from "../Logo";

interface MenuProps {
    children: React.ReactNode;
}

export const Menu = ({ children }: MenuProps) => {
  const menuClassName = classnames( styles.menu );

  return (
    <nav className={ menuClassName }>
      <Content>
        <Logo />
      </Content>
      <Content>
        {children}
      </Content>
    </nav>
  );
};
