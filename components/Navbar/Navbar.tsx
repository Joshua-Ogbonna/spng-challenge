import { Box, Button, Text } from "@chakra-ui/react";
import { OpenloginUserInfo } from "@toruslabs/openlogin-utils";

interface NavbarProps {
  handleLogin: () => void;
  handleLogout: () => void;
  user: Partial<OpenloginUserInfo>;
}

const Navbar: React.FC<NavbarProps> = ({ handleLogin, user, handleLogout }) => {
  return (
    <Box
      bg="white"
      p="4"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      boxShadow='sm'
    >
      <Box fontWeight="700" color="black" textTransform={"uppercase"} fontSize='24px' cursor='pointer'>
        SOL NG
      </Box>
      <Box display="flex" alignItems="center" gap="20px">
        <Text> {user?.name ? `Welcome, ${user.name}` : null} </Text>
        <Button
          onClick={user?.email ? handleLogout : handleLogin}
          colorScheme="whiteAlpha"
          background='transparent'
          border='1px'
          borderStyle='solid'
          borderColor='black'
          color='black'
          fontSize='14px'
          fontWeight='400'
        >
          {user?.email ? "Logout" : "Login"}
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
