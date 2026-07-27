import { ChatIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useSession } from "hooks/useSession";
import { useSelector } from "react-redux";
import { wrapper } from "store";
import { selectIsMobile } from "store/uiSlice";

import { Layout } from "features/layout";
import { PageProps } from "main";
import { magic } from "utils/auth";
import { useState } from "react";
import { useGetOrgQuery } from "features/api";

const IndexPage = ({ ...props }: PageProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const isMobile = useSelector(selectIsMobile);
  const { data: session, loading: isSessionLoading } = useSession();
  // console.log("🚀 ~ IndexPage ~ session:", session, isSessionLoading);

  const [keyword, setKeyword] = useState<string>();
  const [hasSearched, setHasSearched] = useState(false);
  const org = useGetOrgQuery({ orgUrl: "wiki" });
  console.log("🚀 ~ IndexPage ~ org:", org);
  const [topics, setTopics] = useState<ITopic[]>([]);

  const a = async () => {
    const res = await fetch("/api/all");
    // console.log("🚀 ~ a ~ res:", res);
    const res2 = await fetch("/topics.json");
    let data = await res2.json();
    data = data.filter((topic) => typeof topic.event === "undefined");
    setTopics(data);
  };

  const h = async () => {
    await magic.oauth.loginWithRedirect({
      provider: "github",
      redirectURI: new URL("/callback", window.location.origin).href,
    });
    // await magic.auth.loginWithMagicLink({
    //   email: "contact@romseguy.com",
    //   redirectURI: new URL("/callback", window.location.origin).href,
    // });
  };

  const l = async () => {
    await fetch("/api/login", { method: "DELETE" });
    window.location.href = "/";
  };

  return (
    <Layout {...props}>
      <Flex justifyContent="space-between">
        <HStack>
          <Input onChange={(e) => setKeyword(e.target.value)} />
          <Button
            onClick={() => {
              let i = 0;
              let newTopics: ITopic[] = [];
              for (const topic of topics) {
                for (const m of topic.topicMessages) {
                  if (
                    m.message.includes(keyword) &&
                    !newTopics.find(({ _id }) => _id === topic._id)
                  )
                    newTopics.push(topic);
                }
                ++i;
              }
              setTopics(newTopics);
              setHasSearched(true);
            }}
          >
            Chercher
          </Button>
        </HStack>

        <HStack>
          <>
            <button onClick={toggleColorMode}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            {/* <p>{isMobile ? "Mobile" : "Desktop"}</p> */}
            <p>{session ? session.user.email : "Anonymous"}</p>
            {!session && (
              <p>
                <button onClick={h}>login</button>
              </p>
            )}
            {session && (
              <p>
                <button onClick={l}>logout</button>
              </p>
            )}
          </>
        </HStack>
      </Flex>

      <VStack align="start">
        {topics.map((topic) => (
          <VStack key={topic._id}>
            <Heading>
              <ChatIcon />{" "}
              <a
                href={`https://data.romseguy.com/${topic.org}/d/${topic._id}`}
                target="_blank"
              >
                {topic.topicName}
              </a>
            </Heading>
            {/* {hasSearched &&
              topic.topicMessages.map((m) => (
                <VStack key={m._id}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: m.message.includes(keyword)
                        ? m.message
                        : m.message.substr(0, 50),
                    }}
                  />
                </VStack>
              ))} */}
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
