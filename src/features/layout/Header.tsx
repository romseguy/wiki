import { Button, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { useSession } from "hooks/useSession";
import { PageProps } from "main";
import React, { useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { magic } from "utils/auth";

interface HeaderProps {}

export const Header = ({
  isMobile,
}: React.PropsWithChildren<PageProps & HeaderProps>) => {
  const { data: session, loading: isSessionLoading } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const h = async () => {
    setIsLoading(true);
    await magic.oauth.loginWithRedirect({
      provider: "github",
      redirectURI: new URL("/callback", window.location.origin).href,
    });
    // await magic.auth.loginWithMagicLink({
    //   email: "contact@romseguy.com",
    //   redirectURI: new URL("/callback", window.location.origin).href,
    // });
    setIsLoading(false);
  };

  const l = async () => {
    const b = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
    if (b) {
      setIsLoading(true);
      await fetch("/api/login", { method: "DELETE" });
      window.location.href = "/";
      setIsLoading(false);
    }
  };

  return (
    <Flex
      p={3}
      pb={0}
      {...(isMobile
        ? { flexDir: "column" }
        : { justifyContent: "space-between" })}
    >
      <HStack>
        Wiki{" "}
        <a href="https://romseguy.com" target="_blank">
          romseguy.com
        </a>
      </HStack>

      <HStack>
        <Button
          isLoading={isLoading}
          colorScheme="teal"
          onClick={session ? l : h}
        >
          {session && (
            <HStack spacing={1}>
              <Icon as={FaPowerOff} />
              <Text>{session.user.email}</Text>
            </HStack>
          )}
          {!session && "Se connecter"}
        </Button>
      </HStack>
    </Flex>
  );
};
