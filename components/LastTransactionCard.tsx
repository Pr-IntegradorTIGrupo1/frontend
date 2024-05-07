'use client'
import { Box, Icon, Grid, GridItem, IconButton } from "@chakra-ui/react";
import { CalendarIcon, CopyIcon } from '@chakra-ui/icons';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TagIcon from '@mui/icons-material/Tag';

export default function LastTransactionCard({transactionDate, amount, transasctionId}: {transactionDate: string, amount: string, transasctionId: string}) {
    return (
        <div className="container mx-auto px-4">
            <header>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <div className="flex items-center">
                            <CalendarIcon className="mr-2" />
                            <span>
                                {transactionDate}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <MonetizationOnIcon className="mr-2" />
                            <span>
                                {amount}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-end">
                        <TagIcon className="mr-2" />
                        <span>
                            {transasctionId}
                            <IconButton
                                colorScheme='orange'
                                className="ml-2 bg-gray-800"
                                icon={<CopyIcon />}
                                aria-label="Open drawer"/>
                        </span>
                    </div>
                </div>
            </header>
        </div>
    )
}

'@chakra-ui/icons'