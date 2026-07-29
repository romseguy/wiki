//@ts-nocheck
import { ChatIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Checkbox, HStack, Spinner, VStack } from "@chakra-ui/react";
import { useGetTopicsQuery } from "features/api";
import { Layout } from "features/layout";
import { PageProps } from "main";
import { useState } from "react";
import { FaRulerHorizontal } from "react-icons/fa";
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
  const topics =
    [...(topicsQuery.data || [])].sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1,
    ) || [];

  return (
    <Layout {...props}>
      <VStack align="start">
        <HStack>
          <label>Afficher les messages ?</label>
          <Checkbox onChange={() => setIsMessagesVisible(!isMessagesVisible)} />
        </HStack>

        {topicsQuery.isLoading && <Spinner />}

        {!topicsQuery.isLoading && (
          <>
            {topics.map((topic, index) => (
              <VStack key={topic._id} width="100%" overflowX="clip">
                <a
                  name={"t-" + index}
                  href={`https://data.romseguy.com/${
                    topic.org || topic.event
                  }/d/${topic._id}`}
                  target="_blank"
                >
                  <Button>
                    <ChatIcon mr={1} /> {topic.topicName}{" "}
                  </Button>
                </a>

                <HStack>
                  {index > 0 && (
                    <a href={"#t-" + Number(index - 1)}>
                      <Button>
                        <ChevronLeftIcon />
                      </Button>
                    </a>
                  )}
                  {index < topics.length - 1 && (
                    <a href={"#t-" + Number(index + 1)}>
                      <Button>
                        <ChevronRightIcon />
                      </Button>
                    </a>
                  )}
                </HStack>

                {isMessagesVisible &&
                  topic.topicMessages.map((m, index) => {
                    let msg = m.message.replaceAll("http", "xxxx");
                    msg = msg.replaceAll(
                      "<img",
                      "<img style='max-width: 200px;'",
                    );

                    return (
                      <VStack key={m._id} minWidth="100%">
                        <div
                          style={{ minWidth: "100%" }}
                          dangerouslySetInnerHTML={{
                            __html: msg,
                          }}
                        />
                        {index !== topic.topicMessages.length - 1 && (
                          <hr
                            style={{ border: "1px solid black", width: "100%" }}
                          />
                        )}
                      </VStack>
                    );
                  })}
              </VStack>
            ))}
          </>
        )}
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
