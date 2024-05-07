'use client'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
    RadioGroup,
    Stack,
    Radio,
    IconButton,
  } from '@chakra-ui/react'
//import { ChevronRightIcon } from 'lucide-react'
import React from 'react'
import { ChevronRightIcon } from '@chakra-ui/icons';
export default function LeftDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
  
    return (
      <>
        
        <IconButton
                colorScheme='orange'
                className="ml-2 bg-gray-800"
                onClick={onOpen}
                icon={<ChevronRightIcon />}
                aria-label="Open drawer"
            />
        <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
            <DrawerBody>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
  }