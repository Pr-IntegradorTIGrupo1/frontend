'use client';
import { useState } from 'react';
import { Box, FormControl, FormLabel, Input, VStack, Text, Center, Select } from '@chakra-ui/react';
import { documentoRequisito, documentoRequisito2 } from '@/app/user/versionControl/fakeData/documentoRequisito';

const VersionDetail: React.FC = () => {
  const versions = ["1.0.0", "1.1.0"]; // Lista de versiones
  const [selectedVersion, setSelectedVersion] = useState(versions[0]); // Estado para la versión seleccionada

  // Función para manejar el cambio de versión
  const handleVersionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVersion(event.target.value);
  };

  // Selecciona el documento de requisito según la versión seleccionada
  const currentDocumentoRequisito = selectedVersion === "1.0.0" ? documentoRequisito : documentoRequisito2;

  return (
    <Center>
      <Box width="800px">
        <Box p={5} borderWidth={1} borderRadius={5} boxShadow="lg">
          <VStack spacing={4} align="stretch">
            <FormControl width="30%">
              <FormLabel>Versiones</FormLabel>
              <Select value={selectedVersion} onChange={handleVersionChange}>
                {versions.map((version, index) => (
                  <option key={index} value={version}>{version}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Título de Documento</FormLabel>
              <Input
                value={currentDocumentoRequisito.title}
                readOnly
              />
              <Text>Versión: {currentDocumentoRequisito.version}</Text>
            </FormControl>
            <>
              {currentDocumentoRequisito.requirements.map((requirement, reqIndex) => (
                <Box key={reqIndex} position="relative" borderWidth={1} borderRadius={5} p={4} boxShadow="sm" bg='white'>
                  <Text
                    position="absolute"
                    top={2}
                    left={2}
                    fontWeight="bold"
                    backgroundColor="white"
                    px={2}
                    borderRadius="md"
                  >
                    {`${reqIndex + 1}.`}
                  </Text>
                  <Box mt={4} p={4}>
                    <VStack spacing={4} align="stretch">
                      {requirement.content.map((item, contentIndex) => (
                        <Box key={contentIndex} position="relative" mt={4}>
                          <FormControl>  
                            <Input
                              value={item.split(': ')[0].trim()}
                              readOnly
                              placeholder="Etiqueta"
                              variant='flushed'
                              width="40%"
                            />   
                            <Input
                              value={item.split(': ')[1].trim()}
                              readOnly
                              placeholder="Valor"
                              mt={5}
                            />
                          </FormControl>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                </Box>
              ))}
            </>
          </VStack>
        </Box>
      </Box>
    </Center>
  );
};
export default VersionDetail;
