import { Box, Text, Button, Image } from "@chakra-ui/react";

interface Product {
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" m="4" w="500px">
      <Image src={product.image} h="550px" w="100%" />
      <Box h='100px' marginTop='10px'>
        <Text fontSize="lg" color='black'>{product.name}</Text>
        <Text fontSize="md" color='grey'>{product.price} SOL</Text>
      </Box>
      <Button colorScheme="blue">Purchase</Button>
    </Box>
  );
};

export default ProductCard;
