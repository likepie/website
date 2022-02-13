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
      multipleChoice: true,
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
      <div className="container mx-auto">
        <Head>
          <title>Like Pie</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div className="my-8 grid grid-cols-3 gap-8">
            {props.feed.map((poll) => (
                <div key={poll.id}>
                  <Poll poll={poll}/>
                </div>
            ))}
          </div>
          <Form/>
        </main>
      </div>
  );
};

export default Feed;
