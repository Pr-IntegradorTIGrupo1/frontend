'use client';
import { useEffect, useState } from 'react';
import { Box, FormControl, FormLabel, Input, VStack, Text, Center, Select, Button, Icon, Flex, HStack, Tooltip } from '@chakra-ui/react';
import { AddIcon, DeleteIcon, DownloadIcon } from '@chakra-ui/icons';
import { GET_DOCUMENT_BY_ID } from '../apollo/queries';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Define the types for the document and requirements
type Requirement = {
  id: number;
  content: string;
};

type DocumentVersion = {
  version: number;
  last_version: boolean;
};

type Document = {
  id: number;
  id_document: string;
  id_project: number;
  id_user: number;
  title: string;
  timestamp: string;
  read_only: boolean;
  is_active: boolean;
  requirements: Requirement[];
  version: DocumentVersion;
};

const VersionDetail: React.FC = () => {
  const documentId = parseInt(usePathname().split('/')[3]);
  // const documentId = 1;
  console.log(documentId);
  
  const versions = ["1.0.0", "1.1.0"]; // Lista de versiones
  const [selectedVersion, setSelectedVersion] = useState(versions[0]); // Estado para la versión seleccionada

  // Gestion de documento en la vista
  const { data: RequirementDocument, loading: loadingDocument, error: documentError } = useQuery<{ getDocument: Document }>(GET_DOCUMENT_BY_ID, { variables: { id: documentId } });
  const [documento, setDocumento] = useState<Document | null>(null);

  useEffect(() => {
    if (RequirementDocument) {
      console.log(RequirementDocument);
      setDocumento(RequirementDocument.getDocument);
    }
  }, [RequirementDocument]);

  const router = useRouter();

  const handleVersionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVersion(event.target.value);
  };

  const handleExportPDF = () => {
    const input = document.getElementById('pdfContent');
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
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

  const handleCreateVersion = () => {
    console.log("Crear nueva versión");
    router.push(`/user/versionControl/${documentId}/newVersion`);
  };

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
            {documento && (
              <>
                <FormControl>
                  <FormLabel>Título de Documento</FormLabel>
                  <Input
                    value={documento.title}
                    readOnly
                  />
                  <Text>Versión: {documento.version.version}</Text>
                </FormControl>
                {documento.requirements.map((requirement, reqIndex) => {
                  const parsedContent = JSON.parse(requirement.content);
                  return (
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
                          {parsedContent.content.map((item: string, contentIndex: number) => (
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
                  );
                })}
              </>
            )}
          </VStack>
        </Box>
      </Box>
    </Center>
  );
};

export default VersionDetail;
