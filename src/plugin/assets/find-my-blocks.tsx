import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { useBlocks } from "../../hooks/blocks";
import { windowWasReloaded } from "../../helpers/windowWasReloaded";

import { Box } from "../../components/Box";
import { Loading } from "../../components/Loading";
import { Logo } from "../../components/Logo";
import { Filter } from "../../components/Filter";
import { NavigationItem } from "../../components/NavigationItem";
import { Card } from "../../components/Card";
import { Link } from "../../components/Link";
import { Content } from "../../components/Content";
import { InputText } from "../../components/InputText";
import { Heading } from "../../components/Heading";

import "./find-my-blocks.foundation.css";
import styles from "./find-my-blocks.css";

interface Block {
  name: string;
  posts: Array<string>;
}

interface Post {
  id: number;
  title: string;
  postType: string;
  edit_url: string;
  post_url: string;
}

const App = () => {
  const [activeBlock, setActiveBlock] = useState<string>();
  const [filter, setFilter] = useState<string>("");
  const [offsetHeight, setOffsetHeight] = useState<number>(0);
  const [blocks] = useBlocks();

  useEffect(() => {
    if (blocks.length > 0) {
      const sortedBlocks = blocks.sort((a: Block, b: Block) =>
        a.name > b.name ? 1 : -1
      );
      const localStorageBlock = localStorage.getItem("fmb_active");
      if (windowWasReloaded() && localStorageBlock) {
        setActiveBlock(localStorageBlock);
      } else {
        setActiveBlock(sortedBlocks[0].name);
      }
    }

    const findMyBlocks = document.querySelector("#find-my-blocks");

    if (findMyBlocks) {
      const { top } = findMyBlocks.getBoundingClientRect();
      // Explain this 65!
      setOffsetHeight(offsetHeight + top + 65);
    }
  }, [blocks]);

  const activePosts =
    activeBlock &&
    blocks.find((post: Block) => post.name === activeBlock).posts;

  if (blocks && blocks.length < 1) {
    const style = {
      height: `calc(100vh - ${offsetHeight}px)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
    return (
      <div style={style}>
        <Loading />
      </div>
    );
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.menu}>
        <Box className={styles.logo}>
          <Logo size={85} />
        </Box>
        <InputText
          placeholder="Filter Blocks"
          onChange={(val) => setFilter(val)}
        />
        <Box className={styles.nav}>
          <Filter
            data={blocks}
            value={filter}
            match="name"
            renderedResults={(results) => {
              const blocks = results.map(({ name, posts }) => (
                <NavigationItem
                  key={name}
                  label={name}
                  postCount={posts.length}
                  active={name === activeBlock}
                  onClick={() => {
                    localStorage.setItem("fmb_active", name);
                    setActiveBlock(name);
                  }}
                />
              ));

              return blocks;
            }}
          />
        </Box>
      </Box>
      <Box className={styles.content}>
        <Box>
          <Card title="Settings" toggle initialOpen={true}>
            <Content spacing="large">Order navigation by: select</Content>
            <Content spacing="large">Order cards by: select</Content>
            <Content spacing="large">Permission access level: select</Content>
          </Card>
        </Box>
        <Box className={styles.heading}>
          <Heading>
            <Logo version="pin" color="#444" size={24} />
            {activeBlock}
          </Heading>
        </Box>
        <Box className={styles.cards}>
          {activePosts &&
            activePosts.map((post: Post) => {
              return (
                <Card key={post.id} title={post.title}>
                  <Content>
                    Post Type: <strong>{post.postType}</strong>
                  </Content>

                  <Content>
                    <Link icon="edit" url={post.edit_url}>
                      Edit Post
                    </Link>
                    <Link icon="eye" url={post.post_url}>
                      View Post
                    </Link>
                  </Content>

                  <Content>reusable</Content>
                </Card>
              );
            })}
        </Box>
        <Box className={styles.footer}>
          <Card>
            Developed by{" "}
            <Link url="https://eddysims.com" openInNewTab>
              Eddy Sims
            </Link>{" "}
            <Link
              url="https://find-my-blocks.eddysims.com/donate"
              icon="heart"
              openInNewTab
            >
              Make a donation
            </Link>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

ReactDOM.render(<App />, document.querySelector("#find-my-blocks"));
