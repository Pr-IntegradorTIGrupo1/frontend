
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function RequirementSingleCard() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      
      <Card>
        <CardHeader>
          <CardTitle>Requisito</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Link className="grid gap-4" href="/user/requirement/new">
            <Button variant="outline">Crear Requisito</Button></Link> 

          <Link className="grid gap-4" href="/user/requirement/transactions">
            <Button variant="outline">Ver Requisito</Button></Link>

          <Link className="grid gap-4" href="/user/requirement/delete">
          <Button variant="outline">Eliminar Requisito</Button></Link>

          <Link className="grid gap-4" href="/user/requirement/edit">
          <Button variant="outline">Editar Requisito</Button></Link>
        </CardContent>
      </Card>
    </div>
  )
}