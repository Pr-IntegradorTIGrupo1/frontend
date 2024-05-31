'use client';
import { useState, ChangeEvent } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

interface Requirement {
  title: string;
  content: string;
}

const CreateRequirementForm: React.FC = () => {
  const [documentTitle, setDocumentTitle] = useState<string>('');
  const [requirements, setRequirements] = useState<Requirement[]>([{ title: '', content: '' }]);

  const handleAddRequirement = () => {
    setRequirements([...requirements, { title: '', content: '' }]);
  };

  const handleRequirementChange = (index: number, field: keyof Requirement, value: string) => {
    const newRequirements = [...requirements];
    newRequirements[index][field] = value;
    setRequirements(newRequirements);
  };

  const handleSubmit = () => {
    const formData = {
      documentTitle,
      requirements,
    };
    // Manejar la lógica de envío de datos aquí
    console.log(formData);
  };

  const handleDocumentTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDocumentTitle(e.target.value);
  };

  const handleInputChange = (index: number, field: keyof Requirement) => (e: ChangeEvent<HTMLInputElement>) => {
    handleRequirementChange(index, field, e.target.value);
  };

  return (
    <Box p={5} borderWidth={1} borderRadius={5} boxShadow="lg">
      <VStack spacing={4} align="stretch">
        <FormControl id="document-title">
          <FormLabel>Título del documento</FormLabel>
          <Input 
            type="text" 
            value={documentTitle} 
            onChange={handleDocumentTitleChange} 
          />
        </FormControl>
        {requirements.map((requirement, index) => (
          <Box key={index} borderWidth={1} borderRadius={5} p={4} boxShadow="sm">
            <FormControl id={`requirement-title-${index}`}>
              <FormLabel>Título de requisito</FormLabel>
              <Input 
                type="text" 
                value={requirement.title} 
                onChange={handleInputChange(index, 'title')} 
              />
            </FormControl>
            <FormControl id={`requirement-content-${index}`}>
              <FormLabel>Contenido de Requisito</FormLabel>
              <Input 
                type="text" 
                value={requirement.content} 
                onChange={handleInputChange(index, 'content')} 
              />
            </FormControl>
          </Box>
        ))}
        {requirements[requirements.length - 1].title && requirements[requirements.length - 1].content && (
          <Button onClick={handleAddRequirement} colorScheme="teal">
            Añadir más requisitos
          </Button>
        )}
        <Button onClick={handleSubmit} colorScheme="blue">
          Finalizar
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateRequirementForm;
