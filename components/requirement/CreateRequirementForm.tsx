'use client'
import React, { useState } from 'react'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AddIcon } from '@chakra-ui/icons';
import { on } from 'events';

function CreateRequirementForm(){
    const [documentName, setDocumentName] = useState('')  
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const [loading, setLoading] = useState(false);

    const [requirements, setRequirements] = useState<string[]>([]);
    const [newRequirement, setNewRequirement] = useState('');
    const addRequirement = () => {
      setRequirements([...requirements, newRequirement]);
      setNewRequirement('');
  }
    
    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Document name: ", documentName);
    }

    return (
        <div className="space-y-8 w-[400px] ">
          <form onSubmit={onSubmit} className="space-y-8 ">
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-gray-900 dark:text-gray-50" htmlFor="rut">
                Nombre documento de requisitos
              </Label>
              <Input
                className="text-[#26313c]"
                required
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                id="documentName"
                type="text"
                placeholder="Ingrese el nombre del documento"
                maxLength={50}
                minLength={3}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-gray-900 dark:text-gray-50" htmlFor="rut">
                Requisitos
              </Label>
              <Input
                className="text-[#26313c]"
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                id="newRequirement"
                type="text"
                placeholder="Ingrese un nuevo requisito"
                maxLength={30}
                minLength={3}
              />
              
              <Button type="button" onClick={addRequirement} disabled={!newRequirement}> 
                <AddIcon className="h-6 w-6" />
              </Button>
              {requirements.map((requirement, index) => (
                <div key={index}>{requirement}</div>
              ))}
            </div>
            <div className="w-full">
              
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading || !documentName || requirements.length === 0}
                onClick={onSubmit}
              >
                {loading ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registrando nuevo documento de requiaitos
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
          {alertMessage && (
            <div className="fixed bottom-4 right-4">
              <Alert
                variant={alertType === "big error" ? "destructive" : "default"}
              >
                <AlertTitle>
                  {alertType === "big error"
                    ? "¡Oops, ocurrió un error!"
                    : "¡Registro exitoso!"}
                </AlertTitle>
                <AlertDescription>{alertMessage}</AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      )
}
export default CreateRequirementForm;