import { Heading, Spinner, VStack } from "@chakra-ui/react";
import { Layout } from "features/layout";
import { useRouter } from "next/router";
import { useEffect } from "react";

const DELAY = 2000;

const NotFound = (props) => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, DELAY);
  }, []);

  return (
    <VStack>
      <Heading>404</Heading>
      <>Redirecting to index...</>
      <Spinner />
    </VStack>
  );
};

const NotFoundPage = (props) => {
  return (
    <Layout {...props}>
      <NotFound {...props} />
    </Layout>
  );
};

export default NotFoundPage;
