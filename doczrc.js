import { createPlugin } from "docz-core";

const projectPlugin = () =>
  createPlugin({
    onCreateWebpackConfig: ({ stage, loaders, getConfig }) => {
      const config = getConfig();

      // Prevents the SSR rendering of components and hooks on docz
      if (stage.includes("html")) {
        config.module.rules.push({
          test: /@wordpress\/components/,
          use: loaders.null(),
        });
      }
    },
  });

const defaultFont =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif";

export default {
  title: "Find My Blocks",
  description:
    "Find My Blocks, a WordPress plugin to help finspecific Gutenberg blocks on your WordPress website.",
  typescript: true,
  port: 3339,
  src: "src",
  menu: ["Find My Blocks", "Design System", "Components"],
  plugins: [projectPlugin()],
  themeConfig: {
    fonts: {
      body: defaultFont,
      heading: defaultFont,
    },
    colors: {
      primary: "var(--fmb-red--light)",
      sidebar: {
        bg: "var(--fmb-red)",
        navGroup: "#fff",
        navLinkActive: "#fff",
        tocLink: "#eee",
        tocLinkActive: "#fff",
      },
    },
  },
};
