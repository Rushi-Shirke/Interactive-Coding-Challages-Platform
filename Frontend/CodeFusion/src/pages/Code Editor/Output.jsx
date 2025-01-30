import { Box, Text } from "@chakra-ui/react";
import React from "react";

export const Output = ({ output, isError }) => {
  return (
    <Box w="100%" mt={4} mb={4}>
      <Text mb={2} fontSize="lg" color="white">
        Output
      </Text>
      <Box
        height="40vh"
        p={2}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
        color={isError ? "red.500" : "gray"}
        overflowY="auto"
      >
        {output && output.length > 0
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};

export default Output;
