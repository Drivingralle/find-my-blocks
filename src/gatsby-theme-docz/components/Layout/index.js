/** @jsx jsx */
import { useRef, useState } from "react";
import { jsx } from "theme-ui";
import { Global } from "@emotion/core";
import t from "prop-types";
import global from "gatsby-theme-docz/src/theme/global";
import { Sidebar } from "gatsby-theme-docz/src/components/Sidebar";
import { Box } from "../../../../../src/components/Box";
import { InputText } from "../../../../../src/components/InputText";
import * as styles from "gatsby-theme-docz/src/components/Layout/styles";

export const Layout = ({ children }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const nav = useRef();

  return (
    <Box sx={{ "& > div": { flex: "1 1 auto" } }} data-testid="layout">
      <Global styles={global} />
      <Box tag="main" sx={styles.main}>
        {/* <Header onOpen={() => setOpen(s => !s)} /> */}
        <Box sx={styles.wrapper}>
          <Sidebar
            ref={nav}
            open={open}
            query={query}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onClick={() => setOpen(false)}
          />
          <Box>
            <Box>
              <InputText
                placeholder="Type to search..."
                onChange={(val) => setQuery(val)}
              />
            </Box>
            <Box sx={styles.content}>{children}</Box>
            <Box>Footer</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: t.oneOfType([t.arrayOf(t.node), t.node]),
};
