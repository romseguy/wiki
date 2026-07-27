import { Flex, useColorMode } from "@chakra-ui/react";
import Head from "next/head";
import React, { ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { PageProps } from "main";
import { ServerError } from "utils/errors";
import { css } from "@emotion/react";

export interface LayoutProps {
  mainContainer?: boolean;
  title?: string;
}

export const mainStyles = ({
  isDark,
  isMobile,
}: {
  isDark: boolean;
  isMobile: boolean;
}) => {
  return `
    `;
};

export const Layout = ({
  children,
  isMobile,
  mainContainer = true,
  title = "Wiki @romseguy",
  ...props
}: React.PropsWithChildren<PageProps & LayoutProps>) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const main = (c: ReactNode) =>
    mainContainer ? (
      <Flex
        //as="main"
        //flex="1 0 auto"
        flexDir="column"
        bg={isDark ? "gray.700" : "blackAlpha.50"}
        borderRadius="lg"
        m={isMobile ? 0 : 3}
        mt={3}
        p={isMobile ? 3 : 5}
        pt={isMobile ? 4 : 5}
      >
        {c}
      </Flex>
    ) : (
      c
    );

  const page = (c: ReactNode) => (
    <Flex
      //as="main"
      flexDir="column"
      css={css(mainStyles({ isDark, isMobile }))}
    >
      {/* Main */}
      {main(c)}
    </Flex>
  );

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <title>{title}</title>
      </Head>

      <ErrorBoundary
        fallbackRender={(props) => {
          console.log("🚀 ~ error boundary:", props);
          return main(props.error);
        }}
      >
        {page(children)}
      </ErrorBoundary>
    </>
  );
};
