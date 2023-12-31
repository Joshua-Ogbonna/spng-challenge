import Head from "next/head";
import { Inter } from "next/font/google";
import { Box, Button, Heading, Spinner, Text } from "@chakra-ui/react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, UserAuthInfo } from "@web3auth/base";
import { SolanaWallet } from "@web3auth/solana-provider";
import { OpenloginUserInfo } from "@toruslabs/openlogin-utils";
import { useEffect, useState } from "react";
import { Container, SimpleGrid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard/ProductCard";
import Navbar from "../components/Navbar/Navbar";
import products from "../utils/products";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [webAuth, setWebAuth] = useState<Web3Auth | null>(null);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserAuthInfo | null>(null);
  const [user, setUser] = useState<Partial<OpenloginUserInfo>>(
    {} as Partial<OpenloginUserInfo>
  );

  const handleLogin = async () => {
    if (!webAuth) {
      throw new Error("Web3Auth not initialized");
    }

    const web3AuthProvider = await webAuth.connect();

    if (!web3AuthProvider) {
      throw new Error("Web3Auth provider not found");
    }

    handleAuthorized(webAuth);
  };

  const handleLogout = async () => {
    if (!webAuth) {
      throw new Error("Web3Auth provider not found");
    }

    await webAuth.logout();

    setUser({} as Partial<OpenloginUserInfo>);
    setUserInfo(null);
    // window.location.reload()
  };

  const handleAuthorized = async (web: Web3Auth) => {
    if (!web.provider) {
      throw new Error("Web3Auth not initialized");
    }

    const authUser = await web.authenticateUser();
    const user = await web.getUserInfo();
    setUserInfo(authUser);
    setUser(user);
  };

  useEffect(() => {
    const handleInit = async () => {
      setLoading(true);
      try {
        const web3Auth = new Web3Auth({
          clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
          web3AuthNetwork: "sapphire_devnet",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.SOLANA,
            chainId: "0x3",
            rpcTarget: "https://api.devnet.solana.com",
            displayName: "SOLANA DevNet",
            ticker: "SOL",
            tickerName: "Solana",
          },
        });

        await web3Auth.initModal();

        setWebAuth(web3Auth);

        if (web3Auth.connected) {
          handleAuthorized(web3Auth);
        }

        // handleAuthorized(web3Auth)
      } catch (error) {
        throw new Error("Could not initialize project");
      } finally {
        setLoading(false);
      }
    };

    handleInit();
  }, []);

  return (
    <>
      <Head>
        <title>SuperTEAM NG</title>
        <meta name="description" content="Superteam NG Proof of work challenge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        user={user}
      />
      {loading ? (
        <Spinner />
      ) : webAuth && webAuth.connected ? (
        <SimpleGrid columns={3} spacing={1}>
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </SimpleGrid>
      ) : (
        <Box textAlign="center" paddingY="50px">
          Login to view our product catelog
        </Box>
      )}
    </>
  );
}
