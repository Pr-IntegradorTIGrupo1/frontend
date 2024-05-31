'use client';
import { useState, ChangeEvent } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, IconButton, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

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

  const handleRemoveRequirement = (index: number) => {
    const newRequirements = requirements.filter((_, i) => i !== index);
    if (newRequirements.length === 0) {
      setRequirements([{ title: '', content: '' }]);
    } else {
      setRequirements(newRequirements);
    }
  };

  const handleSubmit = () => {
    if (requirements.some(req => req.title === '' || req.content === '')) {
      alert('Todos los requisitos deben estar completos antes de finalizar.');
      return;
    }
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
          <Box key={index} position="relative" borderWidth={1} borderRadius={5} p={4} boxShadow="sm">
            <Text
              position="absolute"
              top={2}
              left={2}
              fontWeight="bold"
              backgroundColor="white"
              px={2}
              borderRadius="md"
            >
              {`${index + 1}.`}
            </Text>
            <IconButton
              icon={<CloseIcon />}
              size="sm"
              position="absolute"
              top={2}
              right={2}
              onClick={() => handleRemoveRequirement(index)}
              aria-label={`Remove requirement ${index + 1}`}
              borderRadius="full"
            />
            <VStack spacing={4} align="stretch" mt={4}>
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
            </VStack>
          </Box>
        ))}
        {requirements.length > 0 && requirements[requirements.length - 1].title && requirements[requirements.length - 1].content && (
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
