'use client';
import { useState } from 'react';
import { Box, FormControl, FormLabel, Input, VStack, Text, Center, Select, Button, Icon, Flex, HStack, Tooltip } from '@chakra-ui/react';
import { documentoRequisito, documentoRequisito2 } from '@/app/user/versionControl/fakeData/documentoRequisito';
import { AddIcon, DeleteIcon, DownloadIcon } from '@chakra-ui/icons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const VersionDetail: React.FC = () => {
  const versions = ["1.0.0", "1.1.0"]; // Lista de versiones
  const [selectedVersion, setSelectedVersion] = useState(versions[0]); // Estado para la versión seleccionada

  // Función para manejar el cambio de versión
  const handleVersionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVersion(event.target.value);
  };

  // Selecciona el documento de requisito según la versión seleccionada
  const currentDocumentoRequisito = selectedVersion === "1.0.0" ? documentoRequisito : documentoRequisito2;

  // Función para exportar a PDF
  const handleExportPDF = () => {
    const input = document.getElementById('pdfContent');
    if (input) { // Verificación para asegurar que input no sea null
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // Ancho de la imagen en el PDF (A4 width in mm)
        const pageHeight = 295; // Altura de la página en el PDF (A4 height in mm)
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Mantener la relación de aspecto
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('documento.pdf');
      }).catch((err) => {
        console.error('Error generating PDF', err);
      });
    } else {
      console.error('El elemento con id "pdfContent" no fue encontrado.');
    }
  };

  // Función para crear una nueva versión
  const handleCreateVersion = () => {
    console.log("Crear nueva versión");
    // Lógica para crear una nueva versión
  };

  // Función para eliminar la versión
  const handleDeleteVersion = () => {
    console.log("Eliminar versión");
    // Lógica para eliminar la versión
  };

  return (
    <Center>
      <Box width="800px">
        <Box p={5} borderWidth={1} borderRadius={5} boxShadow="lg" id="pdfContent">
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between" align="center">
              <FormControl width="30%">
                <FormLabel>Versiones</FormLabel>
                <Select value={selectedVersion} onChange={handleVersionChange}>
                  {versions.map((version, index) => (
                    <option key={index} value={version}>{version}</option>
                  ))}
                </Select>
              </FormControl>

              <Box position={'relative'} top={-25} right={0}>
                <Tooltip label="Exportar a PDF" placement="top" fontSize={'md'}>
                  <Button colorScheme="gray" size="sm" mr={2} onClick={handleExportPDF}>
                    <Icon as={DownloadIcon} />
                  </Button>
                </Tooltip>

                <Tooltip label="Crear nueva versión" placement="top" fontSize={'md'}>
                  <Button colorScheme="green" size="sm" mr={2} onClick={handleCreateVersion}>
                    <Icon as={AddIcon} />
                  </Button>
                </Tooltip>

                <Tooltip label="Eliminar versión" placement="top" fontSize={'md'}> 
                  <Button colorScheme="red" size="sm" onClick={handleDeleteVersion}>
                    <Icon as={DeleteIcon} />
                  </Button>
                </Tooltip>
              </Box>
            </HStack>
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
