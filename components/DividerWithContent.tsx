'use client'
import { AbsoluteCenter, Box, Divider } from "@chakra-ui/react";
import { RepeatClockIcon } from '@chakra-ui/icons';
export function DividerWithContent({content}: {content: string}) {
  return (
    <Box position='relative' padding='10'>
      <Divider />
      <AbsoluteCenter bg='white' px='4'>
        <RepeatClockIcon boxSize={6} />
          <strong>
            {content}
          </strong>
      </AbsoluteCenter>
    </Box>
  )
}

