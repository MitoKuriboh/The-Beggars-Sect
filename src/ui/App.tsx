import React from 'react';
import { Box, Text } from 'ink';

export const App = () => {
  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">
        THE BEGGARS SECT: LI WEI'S ASCENSION
      </Text>
      <Text dimColor>
        A CLI RPG set in the Martial Arts Haven
      </Text>
      <Box marginTop={1}>
        <Text>
          🚧 Game is in development... 🚧
        </Text>
      </Box>
    </Box>
  );
};
