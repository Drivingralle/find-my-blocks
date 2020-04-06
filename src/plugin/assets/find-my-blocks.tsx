import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { useBlocks } from "../../hooks/blocks";
import { windowWasReloaded } from "../../helpers/windowWasReloaded";

import { Box } from "../../components/Box";
import { Logo } from "../../components/Logo";
import { NavigationItem } from "../../components/NavigationItem";
import { Card } from "../../components/Card";
import { Link } from "../../components/Link";

import "./find-my-blocks.foundation.css";
import styles from "./find-my-blocks.css";

const App = () => {
  const [activeBlock, setActiveBlock] = useState();
  const [blocks] = useBlocks();

  useEffect(() => {
    if (blocks.length > 0) {
      const sortedBlocks = blocks.sort((a, b) => (a.name > b.name ? 1 : -1));
      const localStorageBlock = localStorage.getItem("fmb_active");
      if (windowWasReloaded() && localStorageBlock) {
        setActiveBlock(localStorageBlock);
      } else {
        setActiveBlock(sortedBlocks[0].name);
      }
    }
  }, [blocks]);

  const menuItems =
    blocks.length > 0 &&
    blocks.map((block) => {
      return (
        <NavigationItem
          key={block.name}
          label={block.name}
          postCount={block.posts.length}
          active={block.name === activeBlock}
          onClick={() => {
            localStorage.setItem("fmb_active", block.name);
            setActiveBlock(block.name);
          }}
        />
      );
    });

  const activePosts =
    activeBlock && blocks.find((block) => block.name === activeBlock).posts;
  const postCards =
    activePosts &&
    activePosts.map((post) => {
      return (
        <Card key={post.id} title={post.title}>
          <div>
            Post Type: <strong>{post.postType}</strong>
          </div>

          <Link icon="edit" url={post.edit_url}>
            Edit Post
          </Link>
          <Link icon="eye" url={post.post_url}>
            View Post
          </Link>

          <p>reusable</p>
        </Card>
      );
    });

  return (
    <Box className={styles.container}>
      <Box className={styles.menu}>
        <Box className={styles.logo}>
          <Logo size={85} />
        </Box>
        <Box className={styles.nav}>{menuItems}</Box>
      </Box>
      <Box className={styles.cards}>{postCards}</Box>
    </Box>
  );
};

ReactDOM.render(<App />, document.querySelector("#find-my-blocks"));