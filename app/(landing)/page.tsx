'use client'
import Link from "next/link";
import { useMutation } from '@apollo/client';
import { VALIDATE_TOKEN_MUTATION } from '@/components/apollo/mutations';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Loading from "@/components/datosPrueba/Loading";

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token'); // get token from url
  const [validateToken, { loading, error }] = useMutation(VALIDATE_TOKEN_MUTATION);
  const [loadingSpinner, setLoadingSpinner] = useState(false)

  useEffect(() => {
    setLoadingSpinner(true)
    if (token) {
      validateToken({
        variables: {
          input: {
            token: token,
          },
        },
      }).then(response => {
        if (response.data) {
          // Almacenar los datos en localStorage
          localStorage.setItem('userData', JSON.stringify(response.data.validateToken));
          // Redirigir al usuario inmediatamente después de la validación
          setLoadingSpinner(false)
          router.push("/user/dashboard");
        }
      }).catch(err => {
        console.error("Error validating token:", err);
        Swal.fire(
          'Error al validar el token',
          'El token no es válido o ha expirado.',
          'error'
        );
      });
    }
  }, [token, validateToken]);

  return (
    <div className=" flex items-center justify-center h-screen relative">
      {loadingSpinner && <Loading />}
    </div>
  );
}
