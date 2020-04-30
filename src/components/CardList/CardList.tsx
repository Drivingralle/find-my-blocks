import React from "react";

import { Box } from "../Box";
import { Card } from "../Card";
import { Content } from "../Content";
import { Link } from "../Link";
import { Tag } from "../Tag";
import { Logo } from "../Logo";
import { Heading } from "../Heading";

import styles from "./CardList.module.css";

interface Post {
  readonly id: string;
  readonly title: string;
  readonly postType: string;
  readonly edit_url: string;
  readonly post_url: string;
  readonly isReusable: boolean;
  readonly count: number;
}
interface CardListProps {
  readonly cards: Array<Post>;
}

export const CardList = ({ cards }: CardListProps) => {
  if (cards == undefined || cards.length < 1) {
    return (
      <Box className={styles.empty}>
        <Logo size={150} version="pin" />
        <Heading level={2}>No block selected</Heading>
        <Heading level={3}>Please select a block to see more info.</Heading>
      </Box>
    );
  }

  const Cards = cards.map((post) => {
    return (
      <Card key={post.id} title={post.title}>
        <Content>
          Post Type: <strong>{post.postType}</strong>
        </Content>

        <Content spacing="large">
          <Link icon="edit" url={post.edit_url}>
            Edit Post
          </Link>
          <Link icon="eye" url={post.post_url}>
            View Post
          </Link>
        </Content>

        {post.isReusable && (
          <Content>
            <Tag variation="warning" icon="alert-triangle">
              Reusable block
            </Tag>
          </Content>
        )}

        {post.count > 1 && (
          <Content spacing="small">
            <Tag variation="info" icon="plus-circle">
              {post.count} usages in post
            </Tag>
          </Content>
        )}
      </Card>
    );
  });

  return <Box className={styles.cards}>{Cards}</Box>;
};
