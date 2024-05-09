'use client'
import LeftDrawer from "@/components/Drawer";
import PayRecordsTable from "@/components/PayRecordsTable";
import  data  from "@/components/datosPrueba/transactionHistory.testdata";
// Datos de prueba
// Datos de prueba


const transactionHistory = () => {

    return (
        <div>
            <LeftDrawer />
            <main>
                <PayRecordsTable data={data} />
            </main>
        </div>
    )
};
export default transactionHistory