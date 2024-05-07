'use client'
import { Box, Card, CardBody, CardHeader, Heading, Icon, Stack, StackDivider, Text } from "@chakra-ui/react";
import { EmailIcon } from '@chakra-ui/icons';
export default function UserAccountInfoCard({ totalBalance, email, transaccionAmount }: { totalBalance: string, email: string, transaccionAmount: string}) {
    return (
      <Card>
      <CardHeader>
        <Heading size='md' className="text-center">Total Balance:</Heading>
        <Heading size='md' className="text-center">${totalBalance}</Heading>
      </CardHeader>
    
      <CardBody>
        <Stack  spacing='4'>
          <Box>
            <EmailIcon />
            <Text pt='2' fontSize='sm'>
              {email}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Transaction Amount:
            </Heading>
            <Text pt='2' fontSize='sm'>
              {transaccionAmount}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
        
      )
}