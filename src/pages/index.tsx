//@ts-nocheck
import { ChatIcon } from "@chakra-ui/icons";
import { Checkbox, HStack, VStack } from "@chakra-ui/react";
import { useGetTopicsQuery } from "features/api";
import { Layout } from "features/layout";
import { PageProps } from "main";
import { useState } from "react";
import { wrapper } from "store";

const IndexPage = ({ ...props }: PageProps) => {
  const [isMessagesVisible, setIsMessagesVisible] = useState(false);
  //const org = useGetOrgQuery({ orgUrl: "wiki" });

  // const [topics, setTopics] = useState<ITopic[]>([
  //   json.find(
  //     (topic) =>
  //       topic.topicName === "#554 Abbé Saunière and the Rosicrucians Part 1",
  //   ),
  // ]);

  // const [topics, setTopics] = useState<ITopic[]>(json);
  // console.log("🚀 ~ IndexPage ~ topics:", topics);

  const topicsQuery = useGetTopicsQuery();
  const topics = topicsQuery.data || [];

  return (
    <Layout {...props}>
      <VStack align="start">
        <HStack>
          <label>Afficher les messages ?</label>
          <Checkbox onChange={() => setIsMessagesVisible(!isMessagesVisible)} />
        </HStack>
        {topics.map((topic) => (
          <VStack key={topic._id}>
            <HStack>
              <ChatIcon />{" "}
              <a
                href={`https://data.romseguy.com/${topic.org}/d/${topic._id}`}
                target="_blank"
              >
                {topic.topicName}
              </a>
            </HStack>
            {isMessagesVisible &&
              topic.topicMessages.map((m) => (
                <VStack key={m._id}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: m.message.replaceAll("http", "xxxx"),
                    }}
                  />
                </VStack>
              ))}
          </VStack>
        ))}
      </VStack>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    return { props: {} };
  },
);

export default IndexPage;
