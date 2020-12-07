export const wrapper = {
  bg: "white",
  display: "flex",
  flexDirection: "column",
  position: "sticky",
  top: 0,
  zIndex: 10,
  overflowY: "scroll",
  height: "100%",

  "&::-webkit-scrollbar": {
    display: "none",
  },
};

export const logo = {
  py: 5,
  textAlign: "center",
  borderBottom: (t: any) => `1px solid ${t.colors.grey}`,
};

export const navigation = {
  maxWidth: 300,
  m: "0 auto",
  py: 5,
  flex: "1",
};
