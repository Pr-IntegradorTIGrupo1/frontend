'use client'
import {
    Drawer,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    Button,
    VStack,
    IconButton,
    Spacer,
  } from '@chakra-ui/react'
//import { ChevronRightIcon } from 'lucide-react'
import React from 'react'
import { ChevronRightIcon } from '@chakra-ui/icons';
import Link from 'next/link'

export default function LeftDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleLogout = () => {
      // Aquí puedes manejar la lógica de cierre de sesión
      console.log('User logged out');
  };
  
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
            <VStack align="start" spacing={4}>
              <Link href="/">
                <Button colorScheme='orange' className="ml-2 bg-gray-800">Inicio</Button>
              </Link>
              <Button colorScheme='orange' className="ml-2 bg-gray-800">Gestor de pagos</Button>
              <Link href="/user/transactionHistory">
                <Button  colorScheme='orange' className="ml-2 bg-gray-800">Historial de transacciones</Button>
              </Link >
              <Button colorScheme='orange' className="ml-2 bg-gray-800">Pagos recurrentes</Button>
              <Spacer className='mt-80' />
              <Spacer className='mt-80' />
              <Button onClick={handleLogout} colorScheme='orange' className="ml-2 bg-gray-800">Cerrar sesion</Button>
             
            </VStack>
          </DrawerContent>
        </Drawer>
      </>
    )
  }