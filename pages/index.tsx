import Head from 'next/head'
import React from "react";
import { GetStaticProps } from "next";
import Poll, { Form, PollProps } from "../components/Poll";
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.poll.findMany({
    where: {
      published: true,
      private: false,
    },
    select: {
      id: true,
      title: true,
      options: {},
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: { feed },
  };
};

type Props = {
  feed: PollProps[];
};

const Feed: React.FC<Props> = (props) => {
  return (
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          {props.feed.map((poll) => (
              <div key={poll.id}>
                <Poll poll={poll}/>
              </div>
          ))}

          <Form/>
        </main>
      </div>
  );
};

export default Feed;
